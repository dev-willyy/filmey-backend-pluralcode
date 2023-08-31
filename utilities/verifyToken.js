import jwt from 'jsonwebtoken';
import createError from './createError.js';

function verifyToken(req, res, next) {
  const token = req.cookies.access_token;

  if (!token) {
    return next(createError(401, 'You are not authenticated!'));
  }

  jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    if (err) return next(createError(401, 'Token is not valid!'));
    req.user = user;
    next();
  });
}

function verifyUser(req, res, next) {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, 'You are not authorized!'));
    }
  });
}

function verifyIsAdmin(req, res, next) {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, 'You are not authorized as Admin!'));
    }
  });
}

export { verifyToken, verifyUser, verifyIsAdmin };
