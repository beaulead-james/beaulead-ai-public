import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { Router } from 'express';
import multer from 'multer';
import { v4 as uuid } from 'uuid';
import { ObjectStorageService } from '../objectStorage';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// ✅ 디스크 대신 메모리 버퍼로 받아 곧바로 Object Storage에 업로드
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter(_, file, cb) {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (allowed.includes(file.mimetype)) return cb(null, true);
    cb(new Error('Only JPG/PNG/WEBP/GIF allowed'));
  },
});

router.post('/image', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  try {
    // 업로드 키: uploads/<uuid>.<ext>
    const ext = path.extname(req.file.originalname || '').toLowerCase() || '.jpg';
    const key = `uploads/${uuid()}${ext}`;
    const oss = new ObjectStorageService();
    // Object Storage에 업로드 (공개 객체로)
    await oss.uploadPublicObject(key, req.file.buffer, req.file.mimetype || 'application/octet-stream');
    const publicUrl = await oss.getPublicObjectUrl(key);
    // 과거 호환을 위해 상대경로도 함께 내려주지만, 클라이언트는 publicUrl을 우선 사용
    const url = `/uploads/${path.basename(key)}`;
    return res.json({ url, key, publicUrl });
  } catch (e: any) {
    console.error('[upload] object storage error', e);
    return res.status(500).json({ error: 'Upload failed', detail: String(e?.message || e) });
  }
});

export default router;