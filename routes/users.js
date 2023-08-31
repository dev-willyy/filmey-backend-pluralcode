import express from 'express';
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/userController.js';
import { verifyIsAdmin, verifyUser } from '../utilities/verifyToken.js';

const router = express.Router();

// GET ALL USES
router.get('/', verifyIsAdmin, getUsers);

// UPDATE USER
router.put('/:id', verifyUser, updateUser);

// DELETE USER
router.delete('/:id', verifyUser, deleteUser);

// GET USER
router.get('/:id', verifyUser, getUser);

export { router as userRouter };
