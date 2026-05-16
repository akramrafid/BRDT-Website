import { body, validationResult } from 'express-validator';

export const validateDonation = [
  body('amount')
    .isFloat({ min: 1 })
    .withMessage('Amount must be greater than 0'),
  body('donationType')
    .isIn(['one-off', 'monthly', 'annual'])
    .withMessage('Invalid donation type'),
  body('appealType')
    .notEmpty()
    .withMessage('Appeal type is required'),
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
  body('fullName')
    .notEmpty()
    .withMessage('Full name is required'),
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
  body('subject')
    .notEmpty()
    .withMessage('Subject is required'),
  body('message')
    .isLength({ min: 10 })
    .withMessage('Message must be at least 10 characters'),
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
