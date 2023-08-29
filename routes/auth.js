import express from 'express';
import { registerUser } from '../controllers/authController.js';

const router = express.Router();

// Implement middlewares after the APIs are completed
router.post('/register', registerUser);
router.post('/login', registerUser);
router.post('/logout', registerUser);

export { router as authRouter };

