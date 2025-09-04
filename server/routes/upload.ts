import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { Router } from 'express';
import multer from 'multer';
import { v4 as uuid } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// Local file storage (fallback and development)
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

// Memory storage for Object Storage attempts
const memoryStorage = multer.memoryStorage();

const allowed = ['image/jpeg','image/png','image/webp','image/gif'];

const upload = multer({
  storage,
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

router.post('/image', async (req, res) => {
  try {
    // Try Object Storage first in production environment
    if (process.env.REPLIT_ENVIRONMENT === 'production') {
      try {
        await new Promise((resolve, reject) => {
          memoryUpload.single('file')(req, res, async (err) => {
            if (err) return reject(err);
            
            const file = req.file;
            if (!file) return reject(new Error('No file uploaded'));

            try {
              // Generate unique filename
              const filename = uuid() + '.' + file.mimetype.split('/')[1];
              
              // Upload to Object Storage public bucket
              const { objectStorageClient } = await import('../objectStorage');
              const publicPath = process.env.PUBLIC_OBJECT_SEARCH_PATHS?.split(',')[0];
              if (!publicPath) throw new Error('PUBLIC_OBJECT_SEARCH_PATHS not configured');
              
              const bucketName = publicPath.split('/')[1];
              const objectName = `uploads/${filename}`;
              
              const bucket = objectStorageClient.bucket(bucketName);
              const fileObject = bucket.file(objectName);
              
              await fileObject.save(file.buffer, {
                metadata: { contentType: file.mimetype },
              });

              res.json({ url: `/public-objects/uploads/${filename}` });
              resolve(true);
            } catch (objError) {
              reject(objError);
            }
          });
        });
        return; // Success with Object Storage
      } catch (objStorageError) {
        console.warn('Object Storage failed, using local storage:', objStorageError);
      }
    }

    // Fallback to local storage
    upload.single('file')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      
      const url = '/uploads/' + req.file.filename;
      res.json({ url });
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

export default router;