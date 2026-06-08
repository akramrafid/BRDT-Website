import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'error',
        message: 'No token provided'
      });
    }

    const token = authHeader.substring(7);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Token expired'
      });
    }

    return res.status(401).json({
      status: 'error',
      message: 'Invalid token'
    });
  }
};

export const optional = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    }
    next();
  } catch (error) {
    next();
  }
};

export const adminOnly = (req, res, next) => {
  // Must be used AFTER authenticate middleware
  const ADMIN_EMAIL = 'brdtbd@gmail.com';
  if (!req.user || req.user.email !== ADMIN_EMAIL) {
    return res.status(403).json({
      status: 'error',
      message: 'Access denied. Admin only.'
    });
  }
  next();
};
