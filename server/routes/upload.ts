import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { Router } from 'express';
import multer from 'multer';
import { v4 as uuid } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// 운영/개발 동일하게 프로젝트 루트 기준으로 server/uploads 사용
const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    const dest = path.join(process.cwd(), 'server', 'uploads');
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  filename(_req, file, cb) {
    const ext = path.extname(file.originalname || '').toLowerCase();
    cb(null, uuid() + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB
  fileFilter(_, file, cb) {
    const allowed = ['image/jpeg','image/png','image/webp','image/gif'];
    if (allowed.includes(file.mimetype)) return cb(null, true);
    cb(new Error('Only JPG/PNG/WEBP/GIF allowed'));
  },
});

router.post('/image', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const url = '/uploads/' + req.file.filename;
  // 운영 환경에서 절대 URL 필요 시 사용 (프록시/커스텀도메인 대응)
  const origin =
    (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-host'])
      ? `${req.headers['x-forwarded-proto']}://${req.headers['x-forwarded-host']}`
      : `${req.protocol}://${req.get('host')}`;
  const publicUrl = `${origin}${url}`;
  res.json({ url, publicUrl });
});

export default router;