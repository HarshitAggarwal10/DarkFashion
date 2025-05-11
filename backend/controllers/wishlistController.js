const User = require('../models/User');
const Product = require('../models/Product');
const Wishlist = require('../models/Wishlist');
const mongoose = require('mongoose');

exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    // Validate input
    if (!productId) {
      return res.status(400).json({ 
        success: false,
        message: 'Product ID is required' 
      });
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }

    // Check product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }

    // Check if already in wishlist
    const existingItem = await Wishlist.findOne({
      userId: req.user._id,
      productId
    });

    if (existingItem) {
      return res.status(200).json({ 
        success: true,
        message: 'Product is already in your wishlist',
        product: {
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.images?.[0]
        }
      });
    }

    // Add to wishlist
    await Wishlist.create({
      userId: req.user._id,
      productId
    });

    res.status(200).json({
      success: true,
      message: 'Added to wishlist successfully',
      product: {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0]
      }
    });

  } catch (error) {
    console.error(`[${new Date().toISOString()}] Add to wishlist error:`, error);
    res.status(500).json({
      success: false,
      message: 'Failed to add to wishlist',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    await user.removeFromWishlist(req.params.productId);
    res.json({ success: true, message: 'Removed from wishlist' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const wishlistItems = await Wishlist.find({ userId: req.user._id })
      .populate('productId', 'name price images');
    res.status(200).json(wishlistItems);
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({
      message: 'Failed to fetch wishlist',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};