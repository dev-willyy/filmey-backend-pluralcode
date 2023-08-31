import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import createError from '../utilities/createError.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// defaults
dotenv.config();

async function registerUser(req, res, next) {
  const { username, email } = req.body;

  try {
    const currentSubscriber = await User.findOne({ $or: [{ username }, { email }] });

    if (currentSubscriber) {
      const errors = {};

      if (currentSubscriber.username === username) {
        errors.username = `${currentSubscriber.username} is already used by a current subscriber`;
      }
      if (currentSubscriber.email === email) {
        errors.email = `${currentSubscriber.email} is already used by a current subscriber`;
      }

      return next(createError(409, errors));
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const newSubscriber = new User({
      ...req.body,
      password: hashedPassword,
    });

    await newSubscriber.save();

    res.status(201).json({
      status: 'success',
      message: 'User has been successfully created',
    });
  } catch (err) {
    next(err);
  }
}

async function loginUser(req, res, next) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, 'User not found'));

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) return next(createError(409, 'Incorrect password or username!'));

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.SECRET_TOKEN,
      {
        expiresIn: '1 day',
      }
    );

    const { password, isAdmin, ...otherCredentials } = user._doc;

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json({ details: { ...otherCredentials }, isAdmin });
  } catch (err) {
    next(err);
  }
}

async function logoutUser(req, res, next) {
  try {
    const tokens = req.user.tokens;
    console.log(tokens);
    const newTokens = tokens.filter((tok) => tok !== req.token);

    await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });
    res.json({
      success: true,
      message: 'User has been logged out successfully',
    });
  } catch (err) {
    next(err);
  }
}

export { registerUser, loginUser, logoutUser };
