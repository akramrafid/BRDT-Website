import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

// Generate JWT Token
export const generateToken = (userId, email) => {
  return jwt.sign(
    { userId, email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// Verify JWT Token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Generate UUID
export const generateId = () => {
  return uuidv4();
};

// Generate Invoice Number
export const generateInvoiceNumber = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000);
  return `INV-${year}${month}${day}-${String(random).padStart(5, '0')}`;
};

// Format Currency
export const formatCurrency = (amount, currency = 'BDT') => {
  if (currency === 'BDT') {
    return `৳${amount.toLocaleString('bn-BD')}`;
  }
  return `${currency} ${amount.toLocaleString()}`;
};

// Format Date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Validate Email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Hash Response
export const createResponse = (status, message, data = null) => {
  return {
    status,
    message,
    ...(data && { data })
  };
};
