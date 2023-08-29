import dotenv from 'dotenv';
import bcryptjs from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import createError from '../utilities/createError.js';

// defaults
uuidv4();
dotenv.config();

async function registerUser(req, res) {
  // console.log(req.user);
  // await res.send('This is the Register Route');
  const { username, email, password } = req.body;

  try {
    const currentSubscriber = await User.findOne({ $or: [username, email] });

    if (currentSubscriber) {
      const errors = {};

      if (currentSubscriber.username === username) {
        errors.message = `${currentSubscriber.username} is already used by a current subscriber`;
      }
      if (currentSubscriber.email === email) {
        errors.message = `${currentSubscriber.email} is already used by a current subscriber`;
      }
    }

    return createError(409, errors);
  } catch (err) {
    throw new Error(err.message);
  }
}

export { registerUser };
