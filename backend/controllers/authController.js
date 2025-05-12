const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator'); // Added for validation
const logger = require('../utils/logger'); // Optional: for advanced logging

exports.signup = async (req, res) => {
  try {
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, username, password, confirmPassword, name } = req.body;

    // Enhanced validation
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Check existing user with better error distinction
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });
    
    if (existingEmail) {
      return res.status(409).json({ message: "Email already exists" });
    }
    if (existingUsername) {
      return res.status(409).json({ message: "Username already exists" });
    }

    // Create and save user
    const newUser = new User({ 
      email, 
      username, 
      password, 
      name 
    });

    await newUser.save();
    
    // Generate JWT token with refresh token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_REFRESH_SECRET || 'your_refresh_secret',
      { expiresIn: '7d' }
    );

    // Detailed success response
    const userResponse = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      name: newUser.name,
      createdAt: newUser.createdAt
    };

    // Console output with timestamp
    console.log(`\n[${new Date().toISOString()}] New user registered:`);
    console.table([userResponse]);

    res.status(201).json({ 
      success: true,
      message: "User registered successfully",
      token,
      refreshToken,
      user: userResponse
    });

  } catch (error) {
    console.error(`[${new Date().toISOString()}] Signup Error:`, error);
    res.status(500).json({ 
      success: false,
      message: "Registration failed",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // 2) Check if user exists
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect email or password'
      });
    }

    // 3) Generate tokens
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET || 'your_refresh_secret',
      { expiresIn: '7d' }
    );

    // Remove password from output
    user.password = undefined;

    // 4) Send response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      refreshToken,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        name: user.name
      }
    });

  } catch (err) {
    console.error(`[${new Date().toISOString()}] Login Error:`, err);
    res.status(500).json({
      success: false,
      message: 'An error occurred during login',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

exports.logout = (req, res) => {
  // Invalidate token (implementation depends on your token strategy)
  res.clearCookie('token').json({ message: "Logged out successfully" });
};

// Add to authController.js
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
