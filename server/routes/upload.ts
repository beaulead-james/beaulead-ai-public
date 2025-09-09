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
  const ext = (path.extname(req.file.originalname || '').toLowerCase()) || '.jpg';
  const key = `uploads/${uuid()}${ext}`;
  // 1) Object Storage 시도
  try {
    if (process.env.OBJ_STORAGE_DISABLED === '1') throw new Error('OBJ_STORAGE_DISABLED');
    const oss = new ObjectStorageService();
    await oss.uploadPublicObject(key, req.file.buffer, req.file.mimetype || 'application/octet-stream');
    const publicUrl = await oss.getPublicObjectUrl(key);
    const url = `/uploads/${path.basename(key)}`; // 호환용
    return res.json({ ok:true, storage:'object', url, key, publicUrl });
  } catch (e: any) {
    console.warn('[upload] object storage failed, fallback to local:', e?.message || e);
    // 2) 로컬 폴백
    try {
      const destDir = path.join(process.cwd(), 'server', 'uploads');
      if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
      const fname = path.basename(key);
      fs.writeFileSync(path.join(destDir, fname), req.file.buffer);
      const url = `/uploads/${fname}`;
      // DEV에서도 바로 보이게 상대경로 제공 (publicUrl 없음)
      return res.json({ ok:true, storage:'local', url, key, publicUrl: null });
    } catch (e2:any) {
      console.error('[upload] local fallback failed:', e2?.message || e2);
      return res.status(502).json({ ok:false, error:'Upload failed', detail:String(e2?.message||e2) });
    }
  }
});

export default router;