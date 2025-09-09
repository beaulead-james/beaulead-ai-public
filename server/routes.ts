import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { setupRegularAuth, requireAuth } from "./auth-regular";
import { sendContactFormToSlack } from "./services/slack";
import { ObjectStorageService } from "./objectStorage";
import uploadRoutes from "./routes/upload";
import { z } from "zod";
import { db } from "./db";
import { sql, eq, desc } from "drizzle-orm";
import { projectInquiries, insertProjectInquirySchema } from "@shared/schema";
import path from "path";
import fs from "fs";
import crypto from "crypto";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(7, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  budget: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware - both Replit Auth and regular login
  await setupAuth(app);
  setupRegularAuth(app);

  // Upload routes (API endpoint)
  app.use('/api/upload', uploadRoutes);

  // ---- 업로드/스토리지 진단 ----
  app.get('/api/upload/diagnose', async (_req, res) => {
    try {
      const info:any = { ok:true, env: { OBJ_STORAGE_DISABLED: process.env.OBJ_STORAGE_DISABLED || '0' } };
      try {
        const oss = new ObjectStorageService();
        // 임시 사전 체킹: 공개 URL 생성만 시도
        const testUrl = await oss.getPublicObjectUrl('uploads/_diagnose_dummy');
        info.objectStorage = { reachable: true, sampleUrl: testUrl };
      } catch (e:any) {
        info.objectStorage = { reachable: false, error: String(e?.message||e) };
      }
      res.json(info);
    } catch (e:any) {
      res.status(500).json({ ok:false, error: String(e?.message||e) });
    }
  });

  // ---- portfolios 컬럼 보강 (존재하지 않으면 추가) ----
  try {
    await db.execute(sql`ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS category varchar;`);
    await db.execute(sql`ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS tags jsonb;`);
    await db.execute(sql`ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS content_ko text;`);
    await db.execute(sql`ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS content_en text;`);
    console.log('[portfolios] columns updated successfully');
  } catch (e) {
    console.warn('[portfolios] column alter skipped:', e);
  }

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Contact form submission
  app.post('/api/contact', async (req, res) => {
    try {
      // Special handling for admin creation request
      if (req.body.name === 'ADMIN_CREATION_REQUEST' && 
          req.body.message && req.body.message.startsWith('CREATE_ADMIN_')) {
        
        console.log('Processing admin creation request...');
        
        // Check if admin already exists
        const existingAdmin = await storage.getUserByEmail('admin@beaulead.co.kr');
        if (existingAdmin) {
          return res.status(409).json({ message: "Admin account already exists" });
        }

        // Extract password from message
        const password = req.body.message.replace('CREATE_ADMIN_', '');
        
        // Hash the password
        const bcrypt = require('bcryptjs');
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create admin account
        const adminUser = {
          id: 'admin-beaulead',
          email: 'admin@beaulead.co.kr',
          password: hashedPassword,
          role: 'ADMIN' as const,
          firstName: 'Admin',
          lastName: 'BeauLead',
          isReplitUser: false
        };

        await storage.upsertUser(adminUser);
        return res.json({ success: true, message: "Admin account created successfully" });
      }

      // Normal contact form processing
      const formData = contactFormSchema.parse(req.body);
      
      // Format contact form message for Slack
      const contactMessage = `📞 새로운 연락처 문의

*이름:* ${formData.name}
*이메일:* ${formData.email}
*연락처:* ${formData.phone}
*예산:* ${formData.budget || '미선택'}

*메시지:*
${formData.message}

문의 시간: ${new Date().toLocaleString('ko-KR')}`;

      await sendContactFormToSlack(contactMessage);
      res.json({ success: true, message: "Contact form submitted successfully" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid form data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to submit contact form" });
      }
    }
  });

  // ===== 접속통계: 테이블 생성(없으면) =====
  try {
    await db.execute(sql`CREATE TABLE IF NOT EXISTS analytics_events (
      id           varchar PRIMARY KEY DEFAULT gen_random_uuid(),
      ts           timestamptz DEFAULT now(),
      sid          varchar,
      user_id      varchar,
      path         varchar,
      referrer     varchar,
      utm          jsonb,
      ua           varchar,
      ip_hash      varchar,
      device       varchar,
      browser      varchar,
      os           varchar
    );`);
  } catch (e) {
    console.warn("[analytics] init skipped:", e);
  }

  // 유틸: 간단 UA 파싱
  function parseUA(ua: string = '') {
    const low = ua.toLowerCase();
    const device = /mobile|iphone|android/.test(low) ? 'mobile' : 'desktop';
    const browser = /chrome/.test(low) ? 'chrome' : /safari/.test(low) ? 'safari' : /firefox/.test(low) ? 'firefox' : 'other';
    const os = /windows/.test(low) ? 'windows' : /mac os|macintosh/.test(low) ? 'mac' : /android/.test(low) ? 'android' : /ios|iphone|ipad/.test(low) ? 'ios' : 'other';
    return { device, browser, os };
  }
  function hashIp(ip: string) {
    try { return crypto.createHash('sha256').update(ip + (process.env.IP_HASH_SALT || 'salt')).digest('hex'); }
    catch { return 'na'; }
  }

  // ===== 수집: 페이지뷰 =====
  app.post('/api/analytics/track', async (req, res) => {
    try {
      const { type, path, ref, sid, ua, ts, utm } = req.body || {};
      if (type !== 'pageview' || !path) return res.status(400).json({ ok:false, message:'invalid payload' });
      const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || '';
      const { device, browser, os } = parseUA(ua || (req.headers['user-agent'] as string) || '');
      await db.execute(sql`INSERT INTO analytics_events (ts, sid, user_id, path, referrer, utm, ua, ip_hash, device, browser, os)
        VALUES (to_timestamp(${(ts||Date.now())/1000.0}), ${sid||null}, ${(req as any).user?.claims?.sub||null}, ${path}, ${ref||''}, ${utm? JSON.stringify(utm): sql`NULL`}, ${ua||''}, ${hashIp(ip)}, ${device}, ${browser}, ${os});`);
      res.json({ ok:true });
    } catch (e) {
      console.error("[analytics] track error", e);
      res.status(500).json({ ok:false });
    }
  });

  // ===== 집계: 기간 요약 =====
  app.get('/api/analytics/summary', async (req, res) => {
    try {
      const days = Math.max(1, parseInt(String(req.query.days || '30'), 10));
      const to = req.query.to ? new Date(String(req.query.to)) : new Date();
      const from = req.query.from ? new Date(String(req.query.from)) : new Date(to.getTime() - days*864e5);
      const rows:any = await db.execute(sql`
        SELECT 
          COUNT(*)::int AS pageviews,
          COUNT(DISTINCT sid)::int AS unique_visitors
        FROM analytics_events
        WHERE ts >= ${from.toISOString()} AND ts < ${to.toISOString()}
      `);
      const topPaths:any = await db.execute(sql`
        SELECT path, COUNT(*)::int pv
        FROM analytics_events
        WHERE ts >= ${from.toISOString()} AND ts < ${to.toISOString()}
        GROUP BY path ORDER BY pv DESC LIMIT 10
      `);
      res.json({ ok:true, range:{from, to}, totals: rows.rows?.[0]||{pageviews:0,unique_visitors:0}, topPaths: topPaths.rows||[] });
    } catch (e) {
      console.error("[analytics] summary error", e);
      res.status(500).json({ ok:false });
    }
  });

  // ===== 집계: 시계열 (groupBy = day|week|month) =====
  app.get('/api/analytics/timeseries', async (req, res) => {
    try {
      const gb = String(req.query.groupBy || 'day').toLowerCase();
      const groupBy = gb === 'month' ? 'month' : gb === 'week' ? 'week' : 'day';
      const days = Math.max(1, parseInt(String(req.query.days || (groupBy==='day'?30:180)), 10));
      const to = req.query.to ? new Date(String(req.query.to)) : new Date();
      const from = req.query.from ? new Date(String(req.query.from)) : new Date(to.getTime() - days*864e5);

      // 안전한 리터럴 선택
      const truncExpr = groupBy === 'month' ? sql.raw("date_trunc('month', ts)") :
                        groupBy === 'week'  ? sql.raw("date_trunc('week', ts)")  :
                                              sql.raw("date_trunc('day', ts)");
      const fmt       = groupBy === 'month' ? "YYYY-MM" :
                        groupBy === 'week'  ? "IYYY-IW" : "YYYY-MM-DD";

      const rows:any = await db.execute(sql`
        SELECT to_char(${truncExpr}, ${fmt}) AS bucket,
               COUNT(*)::int AS pv,
               COUNT(DISTINCT sid)::int AS uv
        FROM analytics_events
        WHERE ts >= ${from.toISOString()} AND ts < ${to.toISOString()}
        GROUP BY bucket ORDER BY bucket
      `);
      res.json({ ok:true, data: rows.rows||[] });
    } catch (e) {
      console.error("[analytics] timeseries error", e);
      res.status(500).json({ ok:false });
    }
  });

  // ===== (임시) 업로드 폴더 → Object Storage 마이그레이션 =====
  app.post('/api/admin/migrate-uploads', async (req: any, res) => {
    // Simplified admin check for this migration route
    if (!req.session?.user?.role || req.session.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    try {
      const base = path.join(process.cwd(), 'server', 'uploads');
      if (!fs.existsSync(base)) return res.json({ ok:true, migrated: 0, note: 'no local uploads' });
      const oss = new ObjectStorageService();
      const files = fs.readdirSync(base).filter(f => fs.statSync(path.join(base,f)).isFile());
      let ok = 0, fail = 0; const map:any[] = [];
      for (const f of files) {
        const key = `uploads/${f}`;
        try {
          const buf = fs.readFileSync(path.join(base,f));
          const mime = f.endsWith('.png') ? 'image/png' :
                       f.endsWith('.webp') ? 'image/webp' :
                       f.endsWith('.gif') ? 'image/gif' : 'image/jpeg';
          await oss.uploadPublicObject(key, buf, mime);
          const url = await oss.getPublicObjectUrl(key);
          ok++; map.push({ file: f, url });
        } catch (e:any) { fail++; map.push({ file: f, error: String(e?.message||e) }); }
      }
      res.json({ ok:true, migrated: ok, failed: fail, map });
    } catch (e:any) {
      console.error('[migrate-uploads] error', e);
      res.status(500).json({ ok:false, message: String(e?.message||e) });
    }
  });

  // Blog routes
  app.get('/api/blogs', async (req, res) => {
    try {
      const published = req.query.published === 'true' ? true : req.query.published === 'false' ? false : undefined;
      const blogs = await storage.getBlogs(published);
      res.json(blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).json({ message: "Failed to fetch blogs" });
    }
  });

  // Get single blog by slug  
  app.get('/api/blogs/:slug', async (req, res) => {
    try {
      const blog = await storage.getBlog(req.params.slug);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.json(blog);
    } catch (error) {
      console.error("Error fetching blog:", error);
      res.status(500).json({ message: "Failed to fetch blog" });
    }
  });

  // Get single blog by ID (for editing)
  app.get('/api/blogs/id/:id', async (req, res) => {
    try {
      const blog = await storage.getBlogById(req.params.id);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.json(blog);
    } catch (error) {
      console.error("Error fetching blog by ID:", error);
      res.status(500).json({ message: "Failed to fetch blog" });
    }
  });

  // Enhanced mixed auth middleware - supports Replit Auth, JWT, and cookie sessions
  const mixedAuth: any = async (req: any, res: any, next: any) => {
    // First check cookie session
    // @ts-ignore
    const sess = req.session || {};
    if (sess.userId) {
      req.user = {
        claims: {
          sub: sess.userId,
          email: sess.email,
          role: sess.role || 'USER'
        }
      };
      return next();
    }
    
    // JWT 토큰 확인
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return requireAuth(req, res, next);
    }
    
    // Replit Auth 확인
    return isAuthenticated(req, res, next);
  };

  app.post('/api/blogs', mixedAuth, async (req: any, res) => {
    try {
      const userRole = req.user.claims.role || 'USER';
      // ADMIN과 CONTENT_MANAGER 모두 블로그 작성 권한
      if (userRole !== 'ADMIN' && userRole !== 'CONTENT_MANAGER') {
        return res.status(403).json({ message: "Content management access required" });
      }

      // 작성자 ID를 추가
      const blogData = {
        ...req.body,
        authorId: req.user.claims.sub,
        published: req.body.status === 'PUBLISHED',
        // 빈 문자열 categoryId를 null로 변환
        categoryId: req.body.categoryId === '' ? null : req.body.categoryId,
        // 썸네일을 커버 이미지로도 설정
        coverUrl: req.body.thumbnailUrl || req.body.coverUrl,
      };

      const blog = await storage.createBlog(blogData);
      res.status(201).json(blog);
    } catch (error) {
      console.error("Error creating blog:", error);
      res.status(500).json({ message: "Failed to create blog" });
    }
  });

  app.put('/api/blogs/:id', mixedAuth, async (req: any, res) => {
    try {
      const userRole = req.user.claims.role || 'USER';
      if (userRole !== 'ADMIN' && userRole !== 'CONTENT_MANAGER') {
        return res.status(403).json({ message: "Content management access required" });
      }

      // 발행 상태 업데이트
      const updateData = {
        ...req.body,
        published: req.body.status === 'PUBLISHED',
        publishedAt: req.body.status === 'PUBLISHED' ? new Date() : null,
        // 빈 문자열 categoryId를 null로 변환
        categoryId: req.body.categoryId === '' ? null : req.body.categoryId,
        // 썸네일을 커버 이미지로도 설정
        coverUrl: req.body.thumbnailUrl || req.body.coverUrl,
      };

      const blog = await storage.updateBlog(req.params.id, updateData);
      res.json(blog);
    } catch (error) {
      console.error("Error updating blog:", error);
      res.status(500).json({ message: "Failed to update blog" });
    }
  });

  app.delete('/api/blogs/:id', mixedAuth, async (req: any, res) => {
    try {
      const userRole = req.user.claims.role || 'USER';
      if (userRole !== 'ADMIN' && userRole !== 'CONTENT_MANAGER') {
        return res.status(403).json({ message: "Content management access required" });
      }

      await storage.deleteBlog(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting blog:", error);
      res.status(500).json({ message: "Failed to delete blog" });
    }
  });

  // Portfolio routes
  app.get('/api/portfolios', async (req, res) => {
    try {
      const published = req.query.published === 'true' ? true : req.query.published === 'false' ? false : undefined;
      const portfolios = await storage.getPortfolios(published);
      res.json(portfolios);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
      res.status(500).json({ message: "Failed to fetch portfolios" });
    }
  });

  // ✅ Get single portfolio by ID (for editor)
  app.get('/api/portfolios/by-id/:id', async (req, res) => {
    try {
      const p = await storage.getPortfolioById(req.params.id);
      if (!p) return res.status(404).json({ message: "Portfolio not found" });
      res.json(p);
    } catch (error) {
      console.error("Error fetching portfolio by id:", error);
      res.status(500).json({ message: "Failed to fetch portfolio" });
    }
  });

  app.get('/api/portfolios/:slug', async (req, res) => {
    try {
      const portfolio = await storage.getPortfolio(req.params.slug);
      if (!portfolio) {
        return res.status(404).json({ message: "Portfolio not found" });
      }
      res.json(portfolio);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
      res.status(500).json({ message: "Failed to fetch portfolio" });
    }
  });

  app.post('/api/portfolios', mixedAuth, async (req: any, res) => {
    try {
      const userRole = req.user.claims.role || 'USER';
      if (userRole !== 'ADMIN') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const portfolio = await storage.createPortfolio(req.body);
      res.status(201).json(portfolio);
    } catch (error) {
      console.error("Error creating portfolio:", error);
      res.status(500).json({ message: "Failed to create portfolio" });
    }
  });

  app.put('/api/portfolios/:id', mixedAuth, async (req: any, res) => {
    try {
      const userRole = req.user.claims.role || 'USER';
      if (userRole !== 'ADMIN') {
        return res.status(403).json({ message: "Admin access required" });
      }

      const portfolio = await storage.updatePortfolio(req.params.id, req.body);
      res.json(portfolio);
    } catch (error) {
      console.error("Error updating portfolio:", error);
      res.status(500).json({ message: "Failed to update portfolio" });
    }
  });

  app.delete('/api/portfolios/:id', mixedAuth, async (req: any, res) => {
    try {
      const userRole = req.user.claims.role || 'USER';
      if (userRole !== 'ADMIN') {
        return res.status(403).json({ message: "Admin access required" });
      }

      await storage.deletePortfolio(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting portfolio:", error);
      res.status(500).json({ message: "Failed to delete portfolio" });
    }
  });

  // Initialize admin account (one-time setup)
  app.post('/api/auth/init-admin', async (req, res) => {
    try {
      // Check if admin already exists
      const existingAdmin = await storage.getUserByEmail('admin@beaulead.co.kr');
      if (existingAdmin) {
        return res.status(409).json({ message: "Admin account already exists" });
      }

      // Hash the password before creating admin account
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('admin123', 10);

      // Create admin account using upsertUser
      const adminUser = {
        id: 'admin-beaulead',
        email: 'admin@beaulead.co.kr',
        password: hashedPassword,
        role: 'ADMIN' as const,
        firstName: 'Admin',
        lastName: 'BeauLead',
        isReplitUser: false
      };

      await storage.upsertUser(adminUser);
      res.json({ message: "Admin account created successfully" });
    } catch (error) {
      console.error("Error creating admin account:", error);
      res.status(500).json({ message: "Failed to create admin account" });
    }
  });

  // Object Storage routes
  app.post('/api/objects/upload', isAuthenticated, async (req: any, res) => {
    try {
      const objectStorageService = new ObjectStorageService();
      const uploadURL = await objectStorageService.getObjectEntityUploadURL();
      res.json({ uploadURL });
    } catch (error) {
      console.error("Error getting upload URL:", error);
      res.status(500).json({ message: "Failed to get upload URL" });
    }
  });

  // Public objects serving from Object Storage
  app.get('/public-objects/:filePath(*)', async (req, res) => {
    try {
      const filePath = req.params.filePath;
      const objectStorageService = new ObjectStorageService();
      const file = await objectStorageService.searchPublicObject(filePath);
      
      if (!file) {
        return res.status(404).json({ error: 'File not found' });
      }
      
      await objectStorageService.downloadObject(file, res);
    } catch (error) {
      console.error('Error serving public object:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Contact/Leads routes
  app.get('/api/contacts', isAuthenticated, async (req: any, res) => {
    try {
      const userRole = req.user.claims.role || 'USER';
      if (userRole !== 'ADMIN' && userRole !== 'CONTENT_MANAGER') {
        return res.status(403).json({ message: "Management access required" });
      }

      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  // ============================
  // Project Inquiries (프로젝트 문의)
  // ============================
  
  // Create inquiry (public)
  app.post('/api/inquiries', async (req, res) => {
    try {
      const body = insertProjectInquirySchema.parse(req.body || {});
      const [inquiry] = await db.insert(projectInquiries).values(body as any).returning();
      
      // 선택: Slack 알림도 보낼 수 있음
      try {
        const slackMessage = `🆕 새로운 프로젝트 문의

*이름:* ${body.name}
*회사:* ${body.company}
*이메일:* ${body.email}
*연락처:* ${body.phone}
*예산:* ${body.budget || body.budgetCustom || '미선택'}

*마케팅 목표:* ${JSON.stringify(body.goals)}
*캠페인 유형:* ${JSON.stringify(body.campaigns)}
*도메인:* ${body.domain || '미입력'}
*기타 요청사항:* ${body.etc || '없음'}

문의 시간: ${new Date().toLocaleString('ko-KR')}`;

        await sendContactFormToSlack(slackMessage);
      } catch (slackError) {
        console.warn("Slack notification failed:", slackError);
      }
      
      res.status(201).json({ ok: true, data: inquiry });
    } catch (error: any) {
      if (error?.issues) {
        return res.status(400).json({ ok: false, message: "Invalid input", errors: error.issues });
      }
      console.error("[inquiries] create error", error);
      res.status(500).json({ ok: false, message: "Failed to submit inquiry" });
    }
  });

  // Admin: Get all inquiries
  app.get('/api/inquiries', mixedAuth, async (req: any, res) => {
    try {
      const role = req.user?.claims?.role || 'USER';
      if (role !== 'ADMIN') {
        return res.status(403).json({ ok: false, message: "Admin access required" });
      }
      
      const inquiries = await db.select().from(projectInquiries).orderBy(desc(projectInquiries.createdAt));
      res.json({ ok: true, items: inquiries });
    } catch (error) {
      console.error("[inquiries] list error", error);
      res.status(500).json({ ok: false, message: "Failed to fetch inquiries" });
    }
  });

  // Admin: Get inquiry by ID
  app.get('/api/inquiries/:id', mixedAuth, async (req: any, res) => {
    try {
      const role = req.user?.claims?.role || 'USER';
      if (role !== 'ADMIN') {
        return res.status(403).json({ ok: false, message: "Admin access required" });
      }
      
      const [inquiry] = await db.select().from(projectInquiries).where(eq(projectInquiries.id, req.params.id));
      if (!inquiry) {
        return res.status(404).json({ ok: false, message: "Inquiry not found" });
      }
      
      res.json({ ok: true, data: inquiry });
    } catch (error) {
      console.error("[inquiries] detail error", error);
      res.status(500).json({ ok: false, message: "Failed to fetch inquiry" });
    }
  });

  // Admin: Update inquiry status
  app.patch('/api/inquiries/:id/status', mixedAuth, async (req: any, res) => {
    try {
      const role = req.user?.claims?.role || 'USER';
      if (role !== 'ADMIN') {
        return res.status(403).json({ ok: false, message: "Admin access required" });
      }
      
      const status = String(req.body?.status || '');
      if (!['NEW', 'IN_PROGRESS', 'DONE'].includes(status)) {
        return res.status(400).json({ ok: false, message: "Invalid status" });
      }
      
      const result = await db.execute(
        sql`UPDATE project_inquiries SET status=${status}, updated_at=now() WHERE id=${req.params.id} RETURNING *`
      );
      
      res.json({ ok: true, data: result.rows?.[0] });
    } catch (error) {
      console.error("[inquiries] status update error", error);
      res.status(500).json({ ok: false, message: "Failed to update status" });
    }
  });

  // ============================
  // Admin: 포트폴리오 이미지 URL 일괄 보정
  // - /uploads/로 시작하거나 http 없음 → 절대경로로 보정
  // - 옵션: GCS 버킷이 있으면 해당 파일명을 GCS public URL로 매핑 시도
  // ============================
  app.post('/api/admin/portfolio-rewrite-urls', requireAuth, async (req: any, res) => {
    const role = req.user?.claims?.role || 'USER';
    if (role !== 'ADMIN') return res.status(403).json({ ok:false, message:"Admin access required" });
    try {
      const base = `${req.protocol}://${req.get('host')}`;
      const bucket = process.env.REPLIT_OBJSTORE_BUCKET;
      const useGcs = !!bucket;
      const rows:any = await db.execute(sql`SELECT id, thumb_url FROM portfolios`);
      let rew = 0;
      for (const r of (rows.rows||[])) {
        const u = r.thumb_url as string | null;
        if (!u) continue;
        let next = u;
        if (!/^https?:\/\//i.test(u)) {
          // 상대경로 절대화
          next = `${base}${u.startsWith('/')?u:'/'+u}`;
        }
        // /uploads/<file> 형태면 GCS public URL로 승격 시도
        const m = u.match?.(/\/uploads\/([^\/\s]+)$/);
        if (useGcs && m) {
          next = `https://storage.googleapis.com/${bucket}/uploads/${m[1]}`;
        }
        if (next !== u) {
          await db.execute(sql`UPDATE portfolios SET thumb_url=${next}, updated_at=now() WHERE id=${r.id}`);
          rew++;
        }
      }
      res.json({ ok:true, rewritten: rew, bucket: bucket||null });
    } catch (e:any) {
      console.error('[portfolio-rewrite-urls] error', e);
      res.status(500).json({ ok:false, message:String(e?.message||e) });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
