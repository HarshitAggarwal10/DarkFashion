// controllers/userController.js
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

// @desc    Register a new user
// @route   POST /api/users/signup
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    console.log(`User logged in: ${user.email}`);
    
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isSeller: user.isSeller,
      token: generateToken(user._id)
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password
  });

  if (user) {
    console.log('New user created:', { 
      id: user._id, 
      name: user.name, 
      email: user.email,
      createdAt: user.createdAt 
    });
    
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id) // Make sure you have this function
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

export { registerUser, authUser };