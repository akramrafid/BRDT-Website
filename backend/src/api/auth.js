import express from 'express';
import { validateUser } from '../middleware/validation.js';
import { authenticate } from '../middleware/auth.js';
import { createUser, getUserByEmail, getUserById, updateUser, updateUserPassword, verifyPassword, createPasswordResetCode, verifyPasswordResetCode } from '../models/User.js';
import { generateToken, createResponse } from '../utils/helpers.js';

const router = express.Router();

// ==================== POST: Forgot Password Request ====================
router.post('/forgot-password', async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json(createResponse('error', 'Email is required'));
    }

    // Attempt to create reset code
    const result = await createPasswordResetCode(email);
    
    if (!result.success) {
      // For security, do not reveal if user exists or not
      return res.status(200).json(createResponse('success', 'If the email exists, a password reset code has been sent.'));
    }

    const emailHtml = `
      <h2>Reset Your BRDT Password</h2>
      <p>You requested a password reset. Here is your 6-digit reset code:</p>
      <h3 style="background-color: #f8fafc; padding: 15px; border-radius: 5px; font-size: 24px; letter-spacing: 5px; text-align: center;">${result.code}</h3>
      <p>Enter this code on the password reset page.</p>
      <p>This code will expire in 15 minutes.</p>
    `;

    try {
      const { sendEmail } = await import('../services/emailService.js');
      await sendEmail(email, 'Your BRDT Password Reset Code', emailHtml);
    } catch (emailErr) {
      console.error('Failed to send reset code email:', emailErr);
      // We still return success to not leak email existence, but log the error
    }

    return res.status(200).json(createResponse('success', 'Password reset code generated successfully. Please check your email.'));
  } catch (error) {
    next(error);
  }
});

// ==================== POST: Reset Password ====================
router.post('/reset-password', async (req, res, next) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      return res.status(400).json(createResponse('error', 'Email, reset code, and new password are required'));
    }

    // 1. Verify the code
    const result = await verifyPasswordResetCode(email, code);
    
    if (!result.success) {
      return res.status(401).json(createResponse('error', result.error));
    }

    // 2. Update the password
    const updateResult = await updateUserPassword(result.user.user_id, newPassword);
    
    if (!updateResult.success) {
      return res.status(500).json(createResponse('error', 'Failed to reset password. Please try again later.'));
    }

    return res.status(200).json(createResponse('success', 'Password reset successfully. You can now login with your new password.'));
  } catch (error) {
    next(error);
  }
});

// ==================== POST: Register ====================
router.post('/register', validateUser, async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, phoneNumber, address, country } = req.body;

    const result = await createUser(email, password, firstName, lastName, phoneNumber, address, country);
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
      firstName: userResult.user.first_name,
      lastName: userResult.user.last_name,
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
    delete user.magic_link_token;

    return res.status(200).json(createResponse('success', 'User retrieved', user));
  } catch (error) {
    next(error);
  }
});

// ==================== PUT: Update User ====================
router.put('/update', authenticate, async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber, address, country, newsletterSubscribed } = req.body;

    const result = await updateUser(req.user.userId, {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
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

export default router;
