import express from 'express';
import { validateContact } from '../middleware/validation.js';
import pool from '../config/database.js';
import { sendEmail, sendContactResponse } from '../services/emailService.js';
import { generateId, createResponse } from '../utils/helpers.js';

const router = express.Router();

// ==================== POST: Submit Contact Form ====================
router.post('/submit', validateContact, async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    const submissionId = generateId();
    const now = new Date();

    const conn = await pool.getConnection();

    // Save submission to database
    await conn.query(
      'INSERT INTO contact_submissions (submission_id, name, email, subject, message, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [submissionId, name, email, subject, message, now, now]
    );

    // Send confirmation email to user
    const userEmailResult = await sendEmail(
      email,
      'We received your message',
      `<p>Hi ${name},</p><p>Thank you for contacting BRDT. We have received your message and will respond within 24-48 hours.</p><p>Best regards,<br>BRDT Team</p>`
    );

    // Send notification to admin
    const adminEmailResult = await sendEmail(
      process.env.BRDT_EMAIL,
      `New Contact Form Submission from ${name}`,
      `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    );

    conn.release();

    return res.status(201).json(createResponse('success', 'Contact form submitted successfully', {
      submissionId
    }));
  } catch (error) {
    next(error);
  }
});

// ==================== POST: Send Response to Contact ====================
router.post('/respond/:submissionId', async (req, res, next) => {
  try {
    const { submissionId } = req.params;
    const { responseMessage } = req.body;

    if (!responseMessage) {
      return res.status(400).json(createResponse('error', 'Response message required'));
    }

    const conn = await pool.getConnection();

    // Get submission
    const [submissions] = await conn.query(
      'SELECT * FROM contact_submissions WHERE submission_id = ?',
      [submissionId]
    );

    if (submissions.length === 0) {
      conn.release();
      return res.status(404).json(createResponse('error', 'Submission not found'));
    }

    const submission = submissions[0];

    // Send response email
    await sendContactResponse(submission.email, submission.name, responseMessage);

    // Update submission
    const now = new Date();
    await conn.query(
      'UPDATE contact_submissions SET response = ?, is_resolved = TRUE, updated_at = ? WHERE submission_id = ?',
      [responseMessage, now, submissionId]
    );

    conn.release();

    return res.status(200).json(createResponse('success', 'Response sent successfully'));
  } catch (error) {
    next(error);
  }
});

export default router;
