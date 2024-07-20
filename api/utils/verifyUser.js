import { errorHandler } from './error.js';
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    console.log('No token provided');
    return next(errorHandler(401, 'Unauthorized'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token verification failed', err);
      return next(errorHandler(403, 'Forbidden'));
    }

    req.user = { id: user.id };
    console.log('Verified user:', req.user);
    next();
  });
};
