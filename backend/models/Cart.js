const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  tempUserId: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
    unique: true // Ensure only one cart per user
  },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);