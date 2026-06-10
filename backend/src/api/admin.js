import express from 'express';
import { authenticate, adminOnly } from '../middleware/auth.js';
import pool from '../config/database.js';
import { createResponse } from '../utils/helpers.js';

const router = express.Router();

// All admin routes require authentication + admin check
router.use(authenticate, adminOnly);

// ==================== GET: Dashboard Stats ====================
router.get('/stats', async (req, res, next) => {
  try {
    const conn = await pool.getConnection();

    const [[{ totalUsers }]] = await conn.query('SELECT COUNT(*) as totalUsers FROM users WHERE role = "user"');
    const [[{ totalDonations }]] = await conn.query('SELECT COUNT(*) as totalDonations FROM donations');
    const [[{ totalAmount }]] = await conn.query('SELECT COALESCE(SUM(amount), 0) as totalAmount FROM donations WHERE payment_status = "completed"');
    const [[{ totalVolunteers }]] = await conn.query('SELECT COUNT(*) as totalVolunteers FROM volunteers');
    const [[{ totalContacts }]] = await conn.query('SELECT COUNT(*) as totalContacts FROM contact_submissions');
    const [[{ unreadContacts }]] = await conn.query('SELECT COUNT(*) as unreadContacts FROM contact_submissions WHERE is_read = FALSE');
    const [[{ pendingDonations }]] = await conn.query('SELECT COUNT(*) as pendingDonations FROM donations WHERE payment_status = "pending"');

    conn.release();

    return res.status(200).json(createResponse('success', 'Dashboard stats', {
      totalUsers,
      totalDonations,
      totalAmount: parseFloat(totalAmount),
      totalVolunteers,
      totalContacts,
      unreadContacts,
      pendingDonations
    }));
  } catch (error) {
    next(error);
  }
});

// ==================== GET: All Users ====================
router.get('/users', async (req, res, next) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query(
      'SELECT user_id, email, first_name, last_name, phone_number, country, is_active, created_at FROM users WHERE role = "user" ORDER BY created_at DESC'
    );
    conn.release();

    return res.status(200).json(createResponse('success', 'Users list', rows));
  } catch (error) {
    next(error);
  }
});

// ==================== GET: All Donations ====================
router.get('/donations', async (req, res, next) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query(
      'SELECT donation_id, first_name, last_name, email, segment, specific_cause, amount, currency, payment_method, payment_status, transaction_id, created_at FROM donations ORDER BY created_at DESC'
    );
    conn.release();

    return res.status(200).json(createResponse('success', 'Donations list', rows));
  } catch (error) {
    next(error);
  }
});

// ==================== GET: All Volunteers ====================
router.get('/volunteers', async (req, res, next) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query(
      'SELECT * FROM volunteers ORDER BY created_at DESC'
    );
    conn.release();

    return res.status(200).json(createResponse('success', 'Volunteers list', rows));
  } catch (error) {
    next(error);
  }
});

// ==================== GET: All Contact Submissions ====================
router.get('/contacts', async (req, res, next) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query(
      'SELECT * FROM contact_submissions ORDER BY created_at DESC'
    );
    conn.release();

    return res.status(200).json(createResponse('success', 'Contact submissions', rows));
  } catch (error) {
    next(error);
  }
});

// ==================== PATCH: Mark Contact as Read ====================
router.patch('/contacts/:id/read', async (req, res, next) => {
  try {
    const conn = await pool.getConnection();
    await conn.query(
      'UPDATE contact_submissions SET is_read = TRUE, updated_at = NOW() WHERE submission_id = ?',
      [req.params.id]
    );
    conn.release();

    return res.status(200).json(createResponse('success', 'Marked as read'));
  } catch (error) {
    next(error);
  }
});

// ==================== GET: All Subscribers ====================
router.get('/subscribers', async (req, res, next) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query(
      'SELECT subscription_id, email, is_active, created_at FROM newsletter_subscriptions ORDER BY created_at DESC'
    );
    conn.release();

    return res.status(200).json(createResponse('success', 'Subscribers list', rows));
  } catch (error) {
    next(error);
  }
});

export default router;
