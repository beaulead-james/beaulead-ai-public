import express, { type Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import uploadRouter from './routes/upload';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();

// Trust proxy for production deployment
app.set('trust proxy', 1);

// CORS configuration for production
app.use(cors({
  origin: true,
  credentials: true
}));

// Cookie session configuration
app.use(cookieSession({
  name: "sess",
  keys: [process.env.SESSION_SECRET || "dev_secret_change_me"],
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production", // HTTPS면 true, 개발환경에서는 false
  maxAge: 1000 * 60 * 60 * 24 * 7 // 7일
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/uploads', uploadRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve attached assets
app.use('/attached_assets', express.static('attached_assets'));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    // Serve attached assets in production as well
    app.use('/attached_assets', express.static('attached_assets'));
    // Ensure uploads are served in production
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
