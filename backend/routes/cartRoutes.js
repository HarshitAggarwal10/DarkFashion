const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticateUser } = require('../middlewares/authMiddleware'); // Make sure this is imported correctly

// Apply authentication middleware to specific routes
router.post('/', authenticateUser, cartController.addToCart);
router.put('/:productId', authenticateUser, cartController.updateCartItem);
router.delete('/:productId', authenticateUser, cartController.removeFromCart);
router.get('/', authenticateUser, cartController.getCart);

module.exports = router;