const User = require('../models/User');
const Product = require('../models/Product');

exports.addToCart = async (req, res) => {
  try {
    if (!req.body.productId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Product ID is required' 
      });
    }

    const product = await Product.findById(req.body.productId);
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    const quantity = req.body.quantity || 1;
    if (product.stock < quantity) {
      return res.status(400).json({ 
        success: false, 
        message: 'Insufficient stock available' 
      });
    }

    // Find user and update cart
    const user = await User.findById(req.user._id);
    const existingItem = user.cart.find(item => 
      item.product.toString() === req.body.productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({
        product: req.body.productId,
        quantity: quantity
      });
    }

    await user.save();
    
    // Return success response
    res.json({ 
      success: true, 
      message: 'Added to cart',
      product: {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      }
    });

  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to add to cart'
    });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    // Validate input
    if (!req.body.quantity || req.body.quantity < 1) {
      return res.status(400).json({ 
        success: false, 
        message: 'Valid quantity is required' 
      });
    }

    const user = await User.findById(req.user._id);
    const item = user.cart.find(item => 
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
    if (req.body.quantity > product.stock) {
      return res.status(400).json({ 
        success: false, 
        message: 'Insufficient stock available' 
      });
    }

    item.quantity = req.body.quantity;
    await user.save();

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
    const user = await User.findById(req.user._id);
    const initialLength = user.cart.length;
    
    user.cart = user.cart.filter(item => 
      item.product.toString() !== req.params.productId
    );

    if (user.cart.length === initialLength) {
      return res.status(404).json({ 
        success: false, 
        message: 'Item not found in cart' 
      });
    }

    await user.save();

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
    const cartItems = await Cart.find({ user: req.user._id }).populate('product');
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
};
