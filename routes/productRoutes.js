// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { getProducts } = require('../controllers/productController');

// GET request to /api/products will trigger the getProducts function
router.get('/', getProducts);

module.exports = router;