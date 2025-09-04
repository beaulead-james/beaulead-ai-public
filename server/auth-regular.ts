import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { storage } from './storage';
import type { Express, RequestHandler } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here-change-in-production';

// 패스워드 해시 함수
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

// 패스워드 검증 함수
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

// JWT 토큰 생성
export function generateToken(userId: string, email: string, role: string): string {
  return jwt.sign(
    { sub: userId, email, role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// JWT 토큰 검증
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// JWT 기반 인증 미들웨어
export const requireAuth: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') 
    ? authHeader.slice(7) 
    : null;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // 사용자 정보를 req.user에 저장
  (req as any).user = { 
    claims: { 
      sub: decoded.sub, 
      email: decoded.email, 
      role: decoded.role 
    } 
  };
  
  next();
};

// 일반 로그인 라우트 설정
export function setupRegularAuth(app: Express) {
  // 일반 로그인
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log('[DEBUG] Login attempt:', { email, hasPassword: !!password });
      
      if (!email || !password) {
        console.log('[DEBUG] Missing email or password');
        return res.status(400).json({ message: 'Email and password are required' });
      }

      // 이메일로 사용자 찾기
      const user = await storage.getUserByEmail(email);
      console.log('[DEBUG] User lookup result:', { 
        found: !!user, 
        hasPassword: user?.password ? 'yes' : 'no',
        userRole: user?.role 
      });
      
      if (!user || !user.password) {
        console.log('[DEBUG] No user found or no password');
        return res.status(401).json({ 
          message: 'Invalid credentials',
          debug: { userFound: !!user, hasPassword: user?.password ? 'yes' : 'no' }
        });
      }

      // 패스워드 검증
      const isValidPassword = await verifyPassword(password, user.password);
      console.log('[DEBUG] Password verification:', { 
        isValid: isValidPassword,
        inputLength: password.length,
        hashLength: user.password.length 
      });
      
      if (!isValidPassword) {
        console.log('[DEBUG] Password verification failed');
        return res.status(401).json({ 
          message: 'Invalid credentials',
          debug: { passwordVerification: 'failed' }
        });
      }

      // JWT 토큰 생성
      if (!user.email) {
        return res.status(500).json({ message: 'User email is missing' });
      }
      const token = generateToken(user.id, user.email, user.role);

      // 세션에도 사용자 정보 저장 (cookie-session)
      // @ts-ignore
      req.session = {
        userId: user.id,
        role: user.role,
        email: user.email
      };

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // 현재 사용자 정보 (세션 우선, JWT 대안)
  app.get('/api/auth/me', async (req, res) => {
    try {
      // @ts-ignore
      const sess = req.session || {};
      let userId = sess.userId;
      let userRole = sess.role;
      
      // 세션에 정보가 없으면 JWT 토큰 확인
      if (!userId) {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith('Bearer ') 
          ? authHeader.slice(7) 
          : null;
          
        if (token) {
          const decoded = verifyToken(token);
          if (decoded) {
            userId = decoded.sub;
            userRole = decoded.role;
          }
        }
      }
      
      // 아직도 userId가 없으면 비로그인
      if (!userId) {
        return res.status(200).json({ authenticated: false });
      }
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(200).json({ authenticated: false });
      }

      res.json({
        authenticated: true,
        userId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(200).json({ authenticated: false });
    }
  });

  // 로그아웃 (세션과 쿠키 정리)
  app.post('/api/auth/logout', (req, res) => {
    try {
      // cookie-session 정리
      // @ts-ignore
      req.session = null;
      
      // 방어적으로 쿠키도 제거 (Replit Auth와 호환)
      res.clearCookie('sess', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
      res.clearCookie('auth', { httpOnly: true, sameSite: 'lax', secure: true });
      res.clearCookie('connect.sid', { httpOnly: true, sameSite: 'lax', secure: true });
      
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      // 실패해도 사용자 경험상 성공으로 처리
      res.status(200).json({ message: 'Logged out successfully' });
    }
  });

  // 임시 디버깅: 운영서버 데이터베이스 상태 확인
  app.get('/api/debug/db-status', async (req, res) => {
    try {
      const userCount = await storage.getUserCount();
      const testUser = await storage.getUserByEmail('admin@beaulead.co.kr');
      
      res.json({
        databaseUrl: process.env.DATABASE_URL ? `${process.env.DATABASE_URL.slice(0, 30)}...` : 'not set',
        userCount,
        adminUserExists: !!testUser,
        adminHasPassword: testUser?.password ? 'yes' : 'no',
        nodeEnv: process.env.NODE_ENV
      });
    } catch (error) {
      res.status(500).json({ 
        error: 'Database check failed',
        message: error.message 
      });
    }
  });

  // 임시: 운영서버에 관리자 계정 생성
  app.post('/api/debug/create-admin', async (req, res) => {
    try {
      const hashedPassword = await hashPassword('admin123');
      
      const adminData = {
        id: 'admin-beaulead',
        email: 'admin@beaulead.co.kr',
        name: 'BeauLead Admin',
        role: 'ADMIN' as const,
        password: hashedPassword
      };

      const user = await storage.upsertUser(adminData);
      
      res.json({
        success: true,
        message: 'Admin account created/updated',
        admin: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          hasPassword: !!user.password
        }
      });
    } catch (error) {
      res.status(500).json({ 
        error: 'Admin creation failed',
        message: error.message 
      });
    }
  });
}