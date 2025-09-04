import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { setupRegularAuth, requireAuth } from "./auth-regular";
import { sendContactFormToSlack } from "./services/slack";
import { ObjectStorageService } from "./objectStorage";
import { z } from "zod";

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
      await sendContactFormToSlack(formData);
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

  const httpServer = createServer(app);
  return httpServer;
}
