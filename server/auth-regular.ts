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

  // 현재 사용자 정보
  app.get('/api/auth/me', requireAuth, async (req, res) => {
    try {
      const userId = (req as any).user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // 로그아웃 (클라이언트에서 토큰 삭제)
  app.post('/api/auth/logout', (req, res) => {
    res.json({ message: 'Logged out successfully' });
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
}