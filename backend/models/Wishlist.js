const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product ID is required'],
    index: true  // Improves query performance
  },
  addedAt: {
    type: Date,
    default: Date.now,
    immutable: true
  }
}, {
  timestamps: true,  // Adds createdAt and updatedAt automatically
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Prevent duplicate wishlist items (only based on productId now)
wishlistSchema.index({ productId: 1 }, { unique: true });

module.exports = mongoose.model('Wishlist', wishlistSchema);