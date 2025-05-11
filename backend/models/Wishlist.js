const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index: true  // Improves query performance
  },
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

// Prevent duplicate wishlist items
wishlistSchema.index({ userId: 1, productId: 1 }, { unique: true });

// Virtual population (if you need to access wishlist items from user)
wishlistSchema.virtual('product', {
  ref: 'Product',
  localField: 'productId',
  foreignField: '_id',
  justOne: true
});

module.exports = mongoose.model('Wishlist', wishlistSchema);