// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User',    required: true },
  author:  { type: String, required: true },
  text:    { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);