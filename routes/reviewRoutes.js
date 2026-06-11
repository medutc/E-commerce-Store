
// routes/reviewRoutes.js
const express = require('express');
const router  = express.Router();
const { getReviews, addReview, updateReview, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:productId',              getReviews);           // Public — fetch reviews
router.post('/:productId', protect,    addReview);            // Private — post a review

router.put('/:reviewId',   protect,    updateReview);         // Private — edit own review
router.delete('/:reviewId', protect,   deleteReview);         // Private — delete own review

module.exports = router;
