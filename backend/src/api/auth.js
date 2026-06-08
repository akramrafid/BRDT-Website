import express from 'express';
import { validateUser } from '../middleware/validation.js';
import { authenticate } from '../middleware/auth.js';
import { createUser, getUserByEmail, getUserById, updateUser, updateUserPassword, verifyPassword, createMagicLink, verifyMagicLink } from '../models/User.js';
import { generateToken, createResponse } from '../utils/helpers.js';

const router = express.Router();

// ==================== POST: Magic Link Request ====================
router.post('/magic-link-request', async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json(createResponse('error', 'Email is required'));
    }

    // Attempt to create magic link
    const result = await createMagicLink(email);
    
    if (!result.success) {
      // For security, do not reveal if user exists or not
      return res.status(200).json(createResponse('success', 'If the email exists, a login link has been sent.'));
    }

    // TODO: Send Email using NodeMailer / SendGrid here
    // For now, log the token to the console for testing
    console.log(`\n================================`);
    console.log(`📧 MAGIC LINK FOR ${email}:`);
    console.log(`Token: ${result.token}`);
    console.log(`Link: http://localhost:5000/api/auth/magic-link-verify?email=${email}&token=${result.token}`);
    console.log(`================================\n`);

    return res.status(200).json(createResponse('success', 'Magic link generated successfully. Please check your email.'));
  } catch (error) {
    next(error);
  }
});

// ==================== POST/GET: Magic Link Verify ====================
router.all('/magic-link-verify', async (req, res, next) => {
  try {
    // Support both GET (clicking link) and POST (API call)
    const email = req.query.email || req.body.email;
    const token = req.query.token || req.body.token;

    if (!email || !token) {
      return res.status(400).json(createResponse('error', 'Email and token are required'));
    }

    const result = await verifyMagicLink(email, token);
    
    if (!result.success) {
      return res.status(401).json(createResponse('error', result.error));
    }

    const jwtToken = generateToken(result.user.user_id, email);

    // If it was a GET request from a browser, redirect them to the frontend with token
    if (req.method === 'GET') {
      return res.redirect(`/?token=${jwtToken}`);
    }

    return res.status(200).json(createResponse('success', 'Login successful', {
      userId: result.user.user_id,
      email: result.user.email,
      firstName: result.user.first_name,
      lastName: result.user.last_name,
      token: jwtToken
    }));
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
