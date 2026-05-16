export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Validation Error
  if (err.array && typeof err.array === 'function') {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: err.array()
    });
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'error',
      message: 'Token expired'
    });
  }

  // Database Errors
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      status: 'error',
      message: 'Record already exists'
    });
  }

  // Default Error
  const status = err.status || 500;
  const message = err.message || 'Internal server error';

  res.status(status).json({
    status: 'error',
    message: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
