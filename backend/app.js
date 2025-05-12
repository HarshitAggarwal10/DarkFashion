const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authController = require('./controllers/authController'); // Add this line
const Cart = require('./models/Cart'); // Import Cart model
const Wishlist = require('./models/Wishlist'); // Import Wishlist model
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware

// Configure CORS and place it before your routes
const corsOptions = { 
  origin: 'http://localhost:5173', // Replace with your frontend\'s URL
  credentials: true, // Allow cookies and credentials
};
app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes')); // This already handles /api/auth/signup
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/wishlist', require('./routes/wishlistRoutes'));

// Test route
app.get("/", (req, res) => {
  res.send("DarkFashion API is running");
});

// Cart API (e.g., Express)
app.post('/api/cart', async (req, res) => {
  const { productId, quantity } = req.body;

  // Ensure the user is authenticated, otherwise return an error
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const cartItem = new Cart({
      userId: req.user._id,
      productId,
      quantity,
    });
    await cartItem.save();
    res.status(200).json(cartItem);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Failed to add to cart' });
  }
});

// Wishlist API (e.g., Express)
app.post('/api/wishlist', async (req, res) => {
  const { productId } = req.body;

  // Ensure the user is authenticated, otherwise return an error
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const wishlistItem = new Wishlist({
      userId: req.user._id,
      productId,
    });
    await wishlistItem.save();
    res.status(200).json(wishlistItem);
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ message: 'Failed to add to wishlist' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

module.exports = app;

