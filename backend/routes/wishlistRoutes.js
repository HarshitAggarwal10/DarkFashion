const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
// const authMiddleware = require('../middlewares/authMiddleware');

// router.use(authMiddleware.authenticate);

router.delete('/:productId', wishlistController.removeFromWishlist);
router.post('/remove', wishlistController.removeFromWishlist);
router.post('/get', wishlistController.getWishlist);
router.post('/', wishlistController.addToWishlist);
router.post('/add', wishlistController.addToWishlist);

module.exports = router;