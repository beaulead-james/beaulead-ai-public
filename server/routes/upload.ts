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
    const dest = path.join(process.cwd(), 'server', 'uploads');
    console.log(`Upload destination: ${dest}`);
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
      console.log(`Created upload directory: ${dest}`);
    }
    cb(null, dest);
  },
  filename(_, file, cb) {
    const filename = (uuid() + path.extname(file.originalname || '')).toLowerCase();
    console.log(`Uploading file: ${filename}`);
    cb(null, filename);
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
  
  console.log(`File uploaded successfully: ${req.file.path}`);
  const url = '/uploads/' + req.file.filename;
  res.json({ url });
});

export default router;