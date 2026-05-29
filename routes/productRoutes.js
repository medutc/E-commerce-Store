// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { getProducts } = require('../controllers/productController');

// When a GET request hits /api/products, run the getProducts controller
router.get('/', getProducts);

module.exports = router;