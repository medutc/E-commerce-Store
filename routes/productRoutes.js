
// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload'); // add at top

// Add this route BEFORE the /:id routes
router.post('/upload', protect, admin, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.json({ imagePath: `/images/${req.file.filename}` });
});
router.route('/')
    .get(getProducts)                    // Public
    .post(protect, admin, createProduct); // Admin only

router.route('/:id')
    .get(getProductById)                         // Public
    .put(protect, admin, updateProduct)          // Admin only
    .delete(protect, admin, deleteProduct);      // Admin only

module.exports = router;
