const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  wishlist: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    addedAt: { type: Date, default: Date.now }
  }],
  cart: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 },
    addedAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Add methods for wishlist and cart operations
userSchema.methods.addToWishlist = async function(productId) {
  if (!this.wishlist.some(item => item.product.equals(productId))) {
    this.wishlist.push({ product: productId });
    await this.save();
  }
};

userSchema.methods.removeFromWishlist = async function(productId) {
  this.wishlist = this.wishlist.filter(item => !item.product.equals(productId));
  await this.save();
};

userSchema.methods.addToCart = async function(productId, quantity = 1) {
  const existingItem = this.cart.find(item => item.product.equals(productId));
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    this.cart.push({ product: productId, quantity });
  }
  
  await this.save();
};

module.exports = mongoose.model('User', userSchema);