
// controllers/reviewController.js
const Review = require('../models/Review');

// @desc    Get all reviews for a product
// @route   GET /api/reviews/:productId
// @access  Public
const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId })
            .sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Add a review for a product
// @route   POST /api/reviews/:productId
// @access  Private
const addReview = async (req, res) => {
    const { text } = req.body;
    if (!text || !text.trim())
        return res.status(400).json({ message: 'Review text is required' });

    try {
        const review = await Review.create({
            product: req.params.productId,
            user:    req.user._id,
            author:  req.user.name,
            text:    text.trim()
        });
        res.status(201).json(review);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Update (edit) a review
// @route   PUT /api/reviews/:reviewId
// @access  Private (owner only)
const updateReview = async (req, res) => {
    const { text } = req.body;
    if (!text || !text.trim())
        return res.status(400).json({ message: 'Review text is required' });

    try {
        const review = await Review.findById(req.params.reviewId);
        if (!review)
            return res.status(404).json({ message: 'Review not found' });

        // Only the author can edit their review
        if (review.user.toString() !== req.user._id.toString())
            return res.status(403).json({ message: 'Not authorized to edit this review' });

        review.text = text.trim();
        const updated = await review.save();
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:reviewId
// @access  Private (owner only)
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.reviewId);
        if (!review)
            return res.status(404).json({ message: 'Review not found' });

        // Only the author can delete their review
        if (review.user.toString() !== req.user._id.toString())
            return res.status(403).json({ message: 'Not authorized to delete this review' });

        await review.deleteOne();
        res.json({ message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getReviews, addReview, updateReview, deleteReview };
