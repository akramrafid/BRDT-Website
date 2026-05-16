import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { getUserById, updateUser } from '../models/User.js';
import { createResponse } from '../utils/helpers.js';

const router = express.Router();

// ==================== GET: User Profile ====================
router.get('/profile', authenticate, async (req, res, next) => {
  try {
    const result = await getUserById(req.user.userId);
    if (!result.success) {
      return res.status(404).json(createResponse('error', 'User not found'));
    }

    const user = result.user;
    delete user.password_hash;

    return res.status(200).json(createResponse('success', 'Profile retrieved', user));
  } catch (error) {
    next(error);
  }
});

// ==================== PUT: Update Profile ====================
router.put('/profile/update', authenticate, async (req, res, next) => {
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

    return res.status(200).json(createResponse('success', 'Profile updated successfully'));
  } catch (error) {
    next(error);
  }
});

export default router;
