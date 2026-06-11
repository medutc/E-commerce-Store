
// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    getAllOrders
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, addOrderItems)          // Place an order
    .get(protect, admin, getAllOrders);    // Admin: view all orders

router.get('/myorders', protect, getMyOrders);           // My orders
router.get('/:id', protect, getOrderById);               // Single order
router.put('/:id/pay', protect, admin, updateOrderToPaid); // Mark as paid

module.exports = router;
