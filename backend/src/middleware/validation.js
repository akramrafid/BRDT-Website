import { body, validationResult } from 'express-validator';

export const validateDonation = [
  body('amount')
    .isFloat({ min: 1 })
    .withMessage('Amount must be greater than 0'),
  body('segment')
    .notEmpty()
    .withMessage('Segment is required'),
  body('paymentMethod')
    .notEmpty()
    .withMessage('Payment method is required'),
  body('firstName')
    .notEmpty()
    .withMessage('First name is required'),
  body('lastName')
    .notEmpty()
    .withMessage('Last name is required'),
  body('email')
    .isEmail()
    .withMessage('Invalid email address'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    next();
  }
];

export const validateUser = [
  body('email')
    .isEmail()
    .withMessage('Invalid email address'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  body('firstName')
    .notEmpty()
    .withMessage('First name is required'),
  body('lastName')
    .notEmpty()
    .withMessage('Last name is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    next();
  }
];

export const validateContact = [
  body('name')
    .notEmpty()
    .withMessage('Name is required'),
  body('email')
    .isEmail()
    .withMessage('Invalid email address'),
  body('message')
    .isLength({ min: 2 })
    .withMessage('Message must be at least 2 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    next();
  }
];
