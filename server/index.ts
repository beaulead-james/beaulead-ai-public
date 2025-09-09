import express, { type Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// 업로드 디렉토리 절대경로 (운영/로컬 동일 동작)
const UPLOAD_DIR = path.join(process.cwd(), "server", "uploads");

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

// -------------------- 기본 미들웨어 --------------------
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// 요청 로그 (운영 진단용)
app.use((req: Request, _res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === "production") {
    console.log("[REQ]", req.method, req.url);
  }
  next();
});

// -------------------- 업로드 정적 서빙 (항상 최우선) --------------------
const staticUploads = express.static(UPLOAD_DIR, {
  index: false,
  fallthrough: false,
  maxAge: "7d",
  setHeaders(res) {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  },
});
app.use("/uploads", staticUploads);
app.use("/api/uploads", staticUploads);

// 🔁 업로드 파일 폴백: server/uploads 에 없으면 dist/public/uploads 에서도 찾아본다.
app.get("/uploads/:fname", (req, res, next) => {
  const fname = req.params.fname;
  const primary = path.join(process.cwd(), "server", "uploads", fname);
  const fallback = path.join(process.cwd(), "dist", "public", "uploads", fname);
  const send = (p: string) => {
    res.setHeader("Cache-Control", "public, max-age=604800, immutable"); // 7d
    return res.sendFile(p);
  };
  try {
    if (fs.existsSync(primary)) return send(primary);
    if (fs.existsSync(fallback)) return send(fallback);
    return next();
  } catch {
    return next();
  }
});

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
  // -------------------- API 라우트 (SPA보다 위!) --------------------
  const server = await registerRoutes(app);

  // 간단한 헬스체크 (프록시/순서 이슈 진단용)
  app.get("/api/healthz", (_req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.json({ ok: true, from: "api/healthz" });
  });

  // ⚠️ API 가드: 등록되지 않은 /api/*는 HTML로 빠지지 않고 JSON 404로 고정
  app.use("/api", (_req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.status(404).json({ ok: false, error: "API_NOT_FOUND" });
  });

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  app.use('/attached_assets', express.static('attached_assets'));
  
  // -------------------- SPA 정적 서빙 & 캐치올 --------------------
  // Vite 미들웨어/serveStatic 유무와 무관하게, 빌드 산출물(dist)을 직접 서빙
  const CLIENT_DIST = path.join(process.cwd(), "dist", "public");
  const CLIENT_INDEX_HTML = path.join(CLIENT_DIST, "index.html");

  if (fs.existsSync(CLIENT_DIST)) {
    // 정적 파일 먼저
    app.use(express.static(CLIENT_DIST, { fallthrough: true, maxAge: "1h" }));

    // 업로드/API가 아닌 모든 경로는 SPA index.html 반환
    app.get("*", (req: Request, res: Response, next: NextFunction) => {
      if (req.path.startsWith("/api") || req.path.startsWith("/uploads")) return next();
      if (fs.existsSync(CLIENT_INDEX_HTML)) {
        res.setHeader("Cache-Control", "no-store");
        return res.sendFile(CLIENT_INDEX_HTML);
      }
      return next();
    });
  } else {
    console.warn("[WARN] client/dist 가 없습니다. 빌드 후에 접근해주세요.");
    
    // 빌드 산출물이 없을 때는 기존 방식 유지
    if (process.env.NODE_ENV === "development") {
      await setupVite(app, server);
    }
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
