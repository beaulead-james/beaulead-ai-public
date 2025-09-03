import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { Router } from 'express';
import multer from 'multer';
import { v4 as uuid } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();
const storage = multer.diskStorage({
  destination(_, __, cb) {
    const dest = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  filename(_, file, cb) {
    cb(null, (uuid() + path.extname(file.originalname || '')).toLowerCase());
  },
});
const allowed = ['image/jpeg','image/png','image/webp','image/gif'];
const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB
  fileFilter(_, file, cb) {
    if (allowed.includes(file.mimetype)) return cb(null, true);
    cb(new Error('Only JPG/PNG/WEBP/GIF allowed'));
  },
});

router.post('/image', upload.single('file'), (req, res) => {
  const url = '/uploads/' + req.file!.filename;
  res.json({ url });
});

export default router;