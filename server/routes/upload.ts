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

// Fallback: Local storage for development
const localStorage = multer.diskStorage({
  destination(_, __, cb) {
    const dest = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  filename(_, file, cb) {
    cb(null, (uuid() + path.extname(file.originalname || '')).toLowerCase());
  },
});

// Memory storage for Object Storage uploads
const memoryStorage = multer.memoryStorage();

const allowed = ['image/jpeg','image/png','image/webp','image/gif'];

const localUpload = multer({
  storage: localStorage,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB
  fileFilter(_, file, cb) {
    if (allowed.includes(file.mimetype)) return cb(null, true);
    cb(new Error('Only JPG/PNG/WEBP/GIF allowed'));
  },
});

const memoryUpload = multer({
  storage: memoryStorage,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB
  fileFilter(_, file, cb) {
    if (allowed.includes(file.mimetype)) return cb(null, true);
    cb(new Error('Only JPG/PNG/WEBP/GIF allowed'));
  },
});

const objectStorageService = new ObjectStorageService();

router.post('/image', async (req, res) => {
  try {
    // Try Object Storage first (for production)
    try {
      const uploadUrl = await objectStorageService.getObjectEntityUploadURL();
      
      // Use memory storage for Object Storage
      memoryUpload.single('file')(req, res, async (err) => {
        if (err) {
          throw err;
        }
        
        const file = req.file;
        if (!file) {
          throw new Error('No file uploaded');
        }

        // Upload to Object Storage
        const response = await fetch(uploadUrl, {
          method: 'PUT',
          body: file.buffer,
          headers: {
            'Content-Type': file.mimetype,
          },
        });

        if (!response.ok) {
          throw new Error(`Object Storage upload failed: ${response.status}`);
        }

        // Extract public URL from upload URL
        const objectUrl = uploadUrl.split('?')[0]; // Remove signed parameters
        res.json({ url: objectUrl });
      });
      
      return;
    } catch (objectStorageError) {
      console.warn('Object Storage failed, using local storage:', objectStorageError);
      
      // Fallback to local storage
      localUpload.single('file')(req, res, (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        
        const url = '/uploads/' + req.file!.filename;
        res.json({ url });
      });
    }
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

export default router;