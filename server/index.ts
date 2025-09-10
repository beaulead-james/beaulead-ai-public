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

// 🔁 /uploads/* 요청 시 로컬에 없으면 Object Storage로 폴백
import { ObjectStorageService, objectStorageClient } from "./objectStorage";
app.get("/uploads/:fname", async (req, res, next) => {
  try {
    const fname = req.params.fname;
    const localPath = path.join(process.cwd(), "server", "uploads", fname);
    if (fs.existsSync(localPath)) return res.sendFile(localPath);
    
    // Try to serve from Object Storage directly
    const oss = new ObjectStorageService();
    const publicPaths = oss.getPublicObjectSearchPaths();
    if (publicPaths.length > 0) {
      const fullPath = `${publicPaths[0]}/uploads/${fname}`;
      const { bucketName, objectName } = parseObjectPath(fullPath);
      const bucket = objectStorageClient.bucket(bucketName);
      const file = bucket.file(objectName);
      
      try {
        // Check if file exists
        const [exists] = await file.exists();
        if (exists) {
          // Stream the file directly through our server
          const [metadata] = await file.getMetadata();
          res.set({
            "Content-Type": metadata.contentType || "application/octet-stream",
            "Cache-Control": "public, max-age=604800, immutable",
          });
          const stream = file.createReadStream();
          stream.pipe(res);
          return;
        }
      } catch (error) {
        console.error('Object Storage fallback error:', error);
      }
    }
    
    return res.status(404).json({ message: "Not Found" });
  } catch {
    return next();
  }
});

// Helper function for parsing object path
function parseObjectPath(path: string): { bucketName: string; objectName: string } {
  if (!path.startsWith("/")) path = `/${path}`;
  const pathParts = path.split("/");
  if (pathParts.length < 3) throw new Error("Invalid path: must contain at least a bucket name");
  const bucketName = pathParts[1];
  const objectName = pathParts.slice(2).join("/");
  return { bucketName, objectName };
}

// === Build version helpers ===
let __BUILD_ID_CACHE: string | null = null;
function readBuildId(): string {
  if (__BUILD_ID_CACHE) return __BUILD_ID_CACHE;
  const p1 = path.join(process.cwd(), "dist", "public", "build-id.txt");
  const p2 = path.join(process.cwd(), "client", "dist", "build-id.txt");
  try {
    if (fs.existsSync(p1)) return (__BUILD_ID_CACHE = fs.readFileSync(p1, "utf8").trim());
    if (fs.existsSync(p2)) return (__BUILD_ID_CACHE = fs.readFileSync(p2, "utf8").trim());
  } catch {}
  // Fallback: ENV → git short sha → timestamp
  const envId = process.env.BUILD_ID;
  if (envId && envId !== "unknown") return (__BUILD_ID_CACHE = envId);
  try {
    const { execSync } = require("child_process");
    const sha = String(execSync("git rev-parse --short HEAD")).trim();
    if (sha) return (__BUILD_ID_CACHE = `dev-${sha}`);
  } catch {}
  return (__BUILD_ID_CACHE = `dev-${Date.now()}`);
}


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

  // (리다이렉트는 제거: 아래에서 직접 index.html을 서빙하도록 변경)

  // 간단한 헬스체크 (프록시/순서 이슈 진단용)
  app.get("/api/healthz", (_req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.json({ ok: true, from: "api/healthz" });
  });

  // 빌드 버전 확인 엔드포인트
  app.get("/api/version", (_req: Request, res: Response) => {
    res.setHeader("Cache-Control", "no-store");
    res.json({ buildId: readBuildId(), time: Date.now() });
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
  
  // -------------------- Dev vs Prod 서빙 전략 --------------------
  const IS_DEV = process.env.NODE_ENV === "development" || process.env.FORCE_DEV === "1";
  const CLIENT_DIST = path.join(process.cwd(), "dist", "public");
  const CLIENT_INDEX_HTML = path.join(CLIENT_DIST, "index.html");
  const CLIENT_ROOT = path.join(process.cwd(), "client");
  const CLIENT_INDEX_DEV = path.join(CLIENT_ROOT, "index.html");

  if (IS_DEV && fs.existsSync(CLIENT_INDEX_DEV)) {
    // ✅ DEV: Vite 미들웨어(HMR) 활성화 → 즉시 반영
    try {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "custom",
        root: CLIENT_ROOT,
        /**
         * Host 보호 해제/허용 목록 지정
         * - Replit 프리뷰 도메인은 매 실행마다 바뀔 수 있으므로
         *   와일드카드로 replit 도메인을 전부 허용
         * - WebSocket(HMR)이 프록시 뒤에서도 안전하게 연결되도록 wss + 443 지정
         */
        // vite v5 기준: server.allowedHosts 는 string[] | boolean
        server: {
          middlewareMode: true,
          allowedHosts: [
            ".replit.dev",
            ".janeway.replit.dev",
            "localhost",
            "127.0.0.1"
          ],
          cors: true,
          hmr: {
            protocol: "wss",
            clientPort: 443
          }
        }
      });
      app.use((req, _res, next) => { req.url = req.url.replace(/^\/client\//, "/"); next(); });
      app.use(vite.middlewares);

      // 특정 라우트 우선 처리
      const serveDevIndex = async (req: Request, res: Response) => {
        try {
          let html = fs.readFileSync(CLIENT_INDEX_DEV, "utf-8");
          html = await vite.transformIndexHtml(req.originalUrl, html);
          res.setHeader("Cache-Control", "no-store, max-age=0, must-revalidate");
          res.setHeader("Pragma", "no-cache");
          res.setHeader("Expires", "0");
          res.setHeader("X-Build-Id", readBuildId());
          return res.status(200).setHeader("Content-Type", "text/html; charset=utf-8").end(html);
        } catch (e) {
          console.error("[vite dev] transformIndexHtml error", e);
          return res.status(500).end("Dev server error");
        }
      };

      // 특정 경로 우선 처리
      app.get("/project-inquiry", serveDevIndex);
      app.get("/inquiry", serveDevIndex);

      // HTML 캐치올 (API/업로드 제외) - transformIndexHtml로 항상 최신 적용
      app.get("*", async (req: Request, res: Response, next: NextFunction) => {
        if (req.path.startsWith("/api") || req.path.startsWith("/uploads")) return next();
        return serveDevIndex(req, res);
      });
      console.log("[DEV] Vite middleware enabled (HMR active)");
    } catch (e) {
      console.warn("[DEV] Vite middleware failed; fallback to dist. Error:", e);
      // Fallback to production mode if Vite fails
    }
  } 
  
  if (!IS_DEV || !fs.existsSync(CLIENT_INDEX_DEV)) {
    // ✅ PROD: 빌드된 dist 정적 서빙
    if (fs.existsSync(CLIENT_DIST)) {
      app.use((req, res, next) => { 
        res.setHeader("X-Build-Id", readBuildId()); 
        // 개발 환경에서는 모든 캐시 헤더 비활성화
        if (process.env.NODE_ENV === "development") {
          res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
          res.setHeader("Pragma", "no-cache");
          res.setHeader("Expires", "0");
          res.removeHeader("ETag");
          res.removeHeader("Last-Modified");
        }
        next(); 
      });
      // 개발 환경에서는 캐시 비활성화, 프로덕션에서는 1시간 캐시
      const staticMaxAge = process.env.NODE_ENV === "development" ? "0" : "1h";
      const staticOptions = process.env.NODE_ENV === "development" 
        ? { fallthrough: true, maxAge: staticMaxAge, etag: false, lastModified: false }
        : { fallthrough: true, maxAge: staticMaxAge };
      app.use(express.static(CLIENT_DIST, staticOptions));

      // 👉 SPA의 특정 클라이언트 라우트를 "우선" index.html로 직접 서빙
      const serveIndex = (_req: Request, res: Response) => {
        if (fs.existsSync(CLIENT_INDEX_HTML)) {
          res.setHeader("Cache-Control", "no-store");
          res.setHeader("X-Build-Id", readBuildId());
          return res.sendFile(CLIENT_INDEX_HTML);
        }
        return res.status(404).end();
      };

      // 두 경로 모두 확실하게 index.html 반환
      app.get("/project-inquiry", serveIndex);
      app.get("/inquiry", serveIndex);

      // 업로드/API가 아닌 모든 경로는 SPA index.html 반환 (후순위 캐치올)
      app.get("*", (req: Request, res: Response, next: NextFunction) => {
        if (req.path.startsWith("/api") || req.path.startsWith("/uploads")) return next();
        if (fs.existsSync(CLIENT_INDEX_HTML)) {
          // HTML은 항상 최신으로 (캐시 방지)
          res.setHeader("Cache-Control", "no-store, max-age=0, must-revalidate");
          res.setHeader("Pragma", "no-cache");
          res.setHeader("Expires", "0");
          res.setHeader("X-Build-Id", readBuildId());
          return res.sendFile(CLIENT_INDEX_HTML);
        }
        return next();
      });
    } else {
      console.warn("[WARN] dist 가 없습니다. 빌드 후에 접근해주세요.");
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
