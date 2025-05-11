// routes/userRoutes.js
import express from 'express';
import { registerUser } from '../controllers/userController.js';
import { authUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', authUser);

export default router;