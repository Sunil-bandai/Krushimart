import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }
    next();
  } catch {
    return res.status(401).json({ message: 'Token invalid' });
  }
};

const farmerOnly = (req, res, next) => {
  if (req.user?.role?.toLowerCase() === 'farmer') return next();
  return res.status(403).json({ message: 'Farmers only' });
};

const adminOnly = (req, res, next) => {
  if (req.user?.role?.toLowerCase() === 'admin') return next();
  return res.status(403).json({ message: 'Admins only' });
};

export { protect, farmerOnly, adminOnly };