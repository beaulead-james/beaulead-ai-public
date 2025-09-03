import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { sendContactFormToSlack } from "./services/slack";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(7, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  budget: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

// 업로드 디렉토리 생성
const uploadDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer 설정 - 이미지 업로드용
const storage_multer = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage_multer,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB 제한
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('이미지 파일만 업로드 가능합니다.'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // 정적 파일 제공 - public/uploads 디렉토리
  app.use('/uploads', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1년 캐시
    next();
  });
  
  app.use('/uploads', express.static(uploadDir));

  // Auth middleware
  await setupAuth(app);

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

  // 이미지 업로드 엔드포인트
  app.post('/api/upload', isAuthenticated, upload.single('image'), (req: any, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      
      const imageUrl = `/uploads/${req.file.filename}`;
      res.json({ 
        success: true, 
        imageUrl: imageUrl,
        filename: req.file.filename 
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ message: 'Failed to upload image' });
    }
  });

  // Contact form submission
  app.post('/api/contact', async (req, res) => {
    try {
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

  app.post('/api/blogs', isAuthenticated, async (req: any, res) => {
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
      };

      const blog = await storage.createBlog(blogData);
      res.status(201).json(blog);
    } catch (error) {
      console.error("Error creating blog:", error);
      res.status(500).json({ message: "Failed to create blog" });
    }
  });

  app.put('/api/blogs/:id', isAuthenticated, async (req: any, res) => {
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
      };

      const blog = await storage.updateBlog(req.params.id, updateData);
      res.json(blog);
    } catch (error) {
      console.error("Error updating blog:", error);
      res.status(500).json({ message: "Failed to update blog" });
    }
  });

  app.delete('/api/blogs/:id', isAuthenticated, async (req: any, res) => {
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

  app.post('/api/portfolios', isAuthenticated, async (req: any, res) => {
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

  app.put('/api/portfolios/:id', isAuthenticated, async (req: any, res) => {
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

  app.delete('/api/portfolios/:id', isAuthenticated, async (req: any, res) => {
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
