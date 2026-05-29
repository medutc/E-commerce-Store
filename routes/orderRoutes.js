// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { addOrderItems } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// Notice 'protect' runs before running 'addOrderItems'
router.post('/', protect, addOrderItems);

module.exports = router;