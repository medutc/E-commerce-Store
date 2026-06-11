// middleware/upload.js
const multer = require('multer');
const path   = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'images/'); // Saves to /images folder
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `product_${Date.now()}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|gif|avif/;
  const valid = allowed.test(path.extname(file.originalname).toLowerCase())
             && allowed.test(file.mimetype);
  valid ? cb(null, true) : cb(new Error('Images only!'));
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
module.exports = upload;