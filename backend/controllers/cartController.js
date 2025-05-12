const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart'); // Import the new Cart model

// Helper function to get tempUserId from headers
const getTempUserId = (req) => req.headers['x-temporary-user-id'];

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id; // From authenticated user

    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if product already in cart
    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      // Existing cart - update quantity
      const itemIndex = cart.items.findIndex(item => item.product.equals(productId));

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    } else {
      // New cart
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }]
      });
    }

    await cart.save();
    res.status(200).json(cart);

  } catch (error) {
    console.error('Cart error:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const tempUserId = getTempUserId(req);
    if (!tempUserId) {
      return res.status(401).json({ success: false, message: 'Temporary User ID required' });
    }

    // Validate input
    if (!req.body.quantity || req.body.quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Valid quantity is required'
      });
    }

    // Find the cart by temporary user ID
    const cart = await Cart.findOne({ tempUserId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found for this user'
      });
    }
    const item = cart.items.find(item =>
      item.product.toString() === req.params.productId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    // Check stock availability if decreasing quantity
    const product = await Product.findById(item.product);
    if (!product) { // Should not happen if product exists in cart, but good check
      return res.status(404).json({ success: false, message: 'Product associated with cart item not found' });
    }

    // Calculate new quantity and check stock
    const newQuantity = req.body.quantity;
    if (newQuantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock available'
      });
    }

    item.quantity = newQuantity;
    await cart.save();

    // Return updated cart
    const updatedUser = await User.findById(user._id).populate('cart.product');
    res.json({
      success: true,
      message: 'Cart updated',
      cart: updatedUser.cart
    });

  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update cart',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const tempUserId = getTempUserId(req);
    if (!tempUserId) {
      return res.status(401).json({ success: false, message: 'Temporary User ID required' });
    }

    // Find the cart by temporary user ID
    const cart = await Cart.findOne({ tempUserId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found for this user'
      });
    }
    const initialLength = cart.items.length;

    cart.items = cart.items.filter(item =>
      item.product.toString() !== req.params.productId
    );
    if (user.cart.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    await cart.save();

    // Return updated cart
    const updatedUser = await User.findById(user._id).populate('cart.product');
    res.json({
      success: true,
      message: 'Removed from cart',
      cart: updatedUser.cart
    });

  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove from cart',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    const tempUserId = getTempUserId(req);
    if (!tempUserId) {
      // If no tempUserId, return an empty cart (or handle as unauthorized if preferred)
      return res.status(200).json([]); // Return empty array for new users
    }

    // Find the cart by temporary user ID and populate product details
    const cart = await Cart.findOne({ tempUserId }).populate('items.product', 'name price images');

    if (!cart) {
      return res.status(200).json([]); // If no cart found for the tempUserId, return an empty array
    }
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
};
