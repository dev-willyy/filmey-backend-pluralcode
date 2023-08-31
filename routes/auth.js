import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';
import { authenticateUser } from '../middlewares/authenticateUser.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', authenticateUser, logoutUser);

export { router as authRouter };
