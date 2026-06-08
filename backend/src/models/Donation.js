import pool from '../config/database.js';
import { generateId } from '../utils/helpers.js';

// Create Donation
export const createDonation = async (donationData) => {
  try {
    const conn = await pool.getConnection();
    const donationId = generateId();
    const now = new Date();

    const {
      userId = null,
      segment,
      specificCause = null,
      amount,
      currency = 'BDT',
      donationType = 'one-off',
      paymentMethod,
      paymentStatus = 'pending',
      senderAccountNumber = null,
      transactionId = null,
      firstName,
      lastName,
      email,
      phoneNumber = null,
      isAnonymous = false,
      notes = null
    } = donationData;

    await conn.query(
      `INSERT INTO donations 
       (donation_id, user_id, segment, specific_cause, amount, currency, donation_type, payment_method, payment_status, sender_account_number, transaction_id, first_name, last_name, email, phone_number, is_anonymous, notes, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [donationId, userId, segment, specificCause, amount, currency, donationType, paymentMethod, paymentStatus, senderAccountNumber, transactionId, firstName, lastName, email, phoneNumber, isAnonymous, notes, now, now]
    );

    conn.release();
    console.log('✅ Donation created:', donationId);
    return { success: true, donationId };
  } catch (error) {
    console.error('❌ Error creating donation:', error);
    return { success: false, error: error.message };
  }
};

// Get Donation by ID
export const getDonationById = async (donationId) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM donations WHERE donation_id = ?', [donationId]);
    conn.release();

    if (rows.length === 0) {
      return { success: false, error: 'Donation not found' };
    }

    return { success: true, donation: rows[0] };
  } catch (error) {
    console.error('❌ Error getting donation:', error);
    return { success: false, error: error.message };
  }
};

// Get User Donations
export const getUserDonations = async (userId, limit = 50, offset = 0) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query(
      'SELECT * FROM donations WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [userId, limit, offset]
    );
    conn.release();

    return { success: true, donations: rows };
  } catch (error) {
    console.error('❌ Error getting donations:', error);
    return { success: false, error: error.message };
  }
};

// Update Donation Status
export const updateDonationStatus = async (donationId, status, transactionId = null) => {
  try {
    const conn = await pool.getConnection();
    const now = new Date();

    const query = transactionId 
      ? 'UPDATE donations SET payment_status = ?, transaction_id = ?, updated_at = ? WHERE donation_id = ?'
      : 'UPDATE donations SET payment_status = ?, updated_at = ? WHERE donation_id = ?';
    
    const params = transactionId 
      ? [status, transactionId, now, donationId]
      : [status, now, donationId];

    await conn.query(query, params);

    conn.release();
    console.log('✅ Donation status updated:', donationId);
    return { success: true };
  } catch (error) {
    console.error('❌ Error updating donation:', error);
    return { success: false, error: error.message };
  }
};

// Get Total Donations by Segment
export const getDonationsBySegment = async (segment) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query(
      'SELECT COUNT(*) as count, SUM(amount) as total FROM donations WHERE segment = ? AND payment_status = "completed"',
      [segment]
    );
    conn.release();

    return { success: true, data: rows[0] };
  } catch (error) {
    console.error('❌ Error getting donations:', error);
    return { success: false, error: error.message };
  }
};
