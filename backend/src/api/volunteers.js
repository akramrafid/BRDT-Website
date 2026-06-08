import express from 'express';
import pool from '../config/database.js';
import { generateId, createResponse } from '../utils/helpers.js';

const router = express.Router();

// ==================== POST: Register Volunteer ====================
router.post('/register', async (req, res, next) => {
  try {
    const { fullName, email, phoneNumber, address, skills, availability, motivation } = req.body;

    if (!fullName || !email) {
      return res.status(400).json(createResponse('error', 'Full name and email are required'));
    }

    const volunteerId = generateId();
    const conn = await pool.getConnection();

    await conn.query(
      `INSERT INTO volunteers (volunteer_id, full_name, email, phone_number, address, skills, availability, motivation, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [volunteerId, fullName, email, phoneNumber, address, skills, availability, motivation]
    );

    conn.release();
    console.log('✅ Volunteer registered:', volunteerId);

    return res.status(201).json(createResponse('success', 'Thank you for registering as a volunteer! We will contact you soon.', {
      volunteerId
    }));
  } catch (error) {
    next(error);
  }
});

export default router;
