import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import createError from '../utilities/createError.js';

async function authenticateUser(req, res, next) {
  const tokenBeforeSplit = req.header('Authorization').replace('Bearer ', '');
  const token = tokenBeforeSplit.split(' ')[1];

  if (!token) {
    return next(createError(401, { message: 'Authorization failed' }));
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    const user = await User.findById(decoded.id).select('+tokens');

    if (!user) {
      return next(createError(401, { success: false, message: 'User not found' }));
    }

    req.user = user;
    console.log('req.user: ', req.user);

    req.token = token;
    console.log('req.token:', req.token);

    next();
  } catch (error) {
    res.status(401).json({ message: 'Authorization failed' });
  }
}

export { authenticateUser };
