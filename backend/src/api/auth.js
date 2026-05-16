import express from 'express';
import { validateUser } from '../middleware/validation.js';
import { authenticate } from '../middleware/auth.js';
import { createUser, getUserByEmail, getUserById, updateUser, updateUserPassword, verifyPassword } from '../models/User.js';
import { generateToken } from '../utils/helpers.js';
import { createResponse } from '../utils/helpers.js';

const router = express.Router();

// ==================== POST: Register ====================
router.post('/register', validateUser, async (req, res, next) => {
  try {
    const { email, password, fullName, phone, address, country } = req.body;

    const result = await createUser(email, password, fullName, phone, address, country);
    if (!result.success) {
      return res.status(400).json(createResponse('error', result.error));
    }

    const token = generateToken(result.userId, email);

    return res.status(201).json(createResponse('success', 'User registered successfully', {
      userId: result.userId,
      email,
      token
    }));
  } catch (error) {
    next(error);
  }
});

// ==================== POST: Login ====================
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(createResponse('error', 'Email and password required'));
    }

    const userResult = await getUserByEmail(email);
    if (!userResult.success) {
      return res.status(401).json(createResponse('error', 'Invalid credentials'));
    }

    const isPasswordValid = await verifyPassword(password, userResult.user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json(createResponse('error', 'Invalid credentials'));
    }

    const token = generateToken(userResult.user.user_id, email);

    return res.status(200).json(createResponse('success', 'Login successful', {
      userId: userResult.user.user_id,
      email: userResult.user.email,
      fullName: userResult.user.full_name,
      token
    }));
  } catch (error) {
    next(error);
  }
});

// ==================== GET: Current User ====================
router.get('/me', authenticate, async (req, res, next) => {
  try {
    const result = await getUserById(req.user.userId);
    if (!result.success) {
      return res.status(404).json(createResponse('error', 'User not found'));
    }

    const user = result.user;
    delete user.password_hash;

    return res.status(200).json(createResponse('success', 'User retrieved', user));
  } catch (error) {
    next(error);
  }
});

// ==================== PUT: Update User ====================
router.put('/update', authenticate, async (req, res, next) => {
  try {
    const { fullName, phone, address, country, newsletterSubscribed } = req.body;

    const result = await updateUser(req.user.userId, {
      full_name: fullName,
      phone,
      address,
      country,
      newsletter_subscribed: newsletterSubscribed
    });

    if (!result.success) {
      return res.status(400).json(createResponse('error', result.error));
    }

    return res.status(200).json(createResponse('success', 'User updated successfully'));
  } catch (error) {
    next(error);
  }
});

// ==================== PUT: Change Password ====================
router.put('/change-password', authenticate, async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json(createResponse('error', 'Both passwords required'));
    }

    const userResult = await getUserById(req.user.userId);
    if (!userResult.success) {
      return res.status(404).json(createResponse('error', 'User not found'));
    }

    const isPasswordValid = await verifyPassword(oldPassword, userResult.user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json(createResponse('error', 'Old password is incorrect'));
    }

    const result = await updateUserPassword(req.user.userId, newPassword);
    if (!result.success) {
      return res.status(400).json(createResponse('error', result.error));
    }

    return res.status(200).json(createResponse('success', 'Password changed successfully'));
  } catch (error) {
    next(error);
  }
});

export default router;
