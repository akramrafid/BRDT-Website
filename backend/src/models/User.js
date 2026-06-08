import pool from '../config/database.js';
import bcrypt from 'bcryptjs';
import { generateId } from '../utils/helpers.js';
import crypto from 'crypto';

// Create User
export const createUser = async (email, password, firstName, lastName, phoneNumber = null, address = null, country = null) => {
  try {
    const conn = await pool.getConnection();
    
    // Check if user exists
    const [existing] = await conn.query('SELECT user_id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      conn.release();
      return { success: false, error: 'Email already registered' };
    }

    // Hash password (if provided)
    let passwordHash = null;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      passwordHash = await bcrypt.hash(password, salt);
    }

    const userId = generateId();
    const now = new Date();

    await conn.query(
      'INSERT INTO users (user_id, email, password_hash, first_name, last_name, phone_number, address, country, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [userId, email, passwordHash, firstName, lastName, phoneNumber, address, country, now, now]
    );

    conn.release();
    console.log('✅ User created:', userId);
    return { success: true, userId };
  } catch (error) {
    console.error('❌ Error creating user:', error);
    return { success: false, error: error.message };
  }
};

// Get User by Email
export const getUserByEmail = async (email) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
    conn.release();

    if (rows.length === 0) {
      return { success: false, error: 'User not found' };
    }

    return { success: true, user: rows[0] };
  } catch (error) {
    console.error('❌ Error getting user:', error);
    return { success: false, error: error.message };
  }
};

// Get User by ID
export const getUserById = async (userId) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM users WHERE user_id = ?', [userId]);
    conn.release();

    if (rows.length === 0) {
      return { success: false, error: 'User not found' };
    }

    return { success: true, user: rows[0] };
  } catch (error) {
    console.error('❌ Error getting user:', error);
    return { success: false, error: error.message };
  }
};

// Create Magic Link Token
export const createMagicLink = async (email) => {
  try {
    const userResult = await getUserByEmail(email);
    if (!userResult.success) {
      return { success: false, error: 'User not found' };
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiry

    const conn = await pool.getConnection();
    await conn.query(
      'UPDATE users SET magic_link_token = ?, magic_link_expires = ?, updated_at = NOW() WHERE email = ?',
      [token, expiresAt, email]
    );
    conn.release();

    return { success: true, token };
  } catch (error) {
    console.error('❌ Error creating magic link:', error);
    return { success: false, error: error.message };
  }
};

// Verify Magic Link Token
export const verifyMagicLink = async (email, token) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query(
      'SELECT * FROM users WHERE email = ? AND magic_link_token = ? AND magic_link_expires > NOW()',
      [email, token]
    );

    if (rows.length === 0) {
      conn.release();
      return { success: false, error: 'Invalid or expired magic link' };
    }

    const user = rows[0];

    // Clear token after successful use
    await conn.query(
      'UPDATE users SET magic_link_token = NULL, magic_link_expires = NULL, updated_at = NOW() WHERE email = ?',
      [email]
    );

    conn.release();
    return { success: true, user };
  } catch (error) {
    console.error('❌ Error verifying magic link:', error);
    return { success: false, error: error.message };
  }
};

// Update User
export const updateUser = async (userId, updates) => {
  try {
    const conn = await pool.getConnection();
    const now = new Date();

    const updateFields = [];
    const updateValues = [];

    for (const [key, value] of Object.entries(updates)) {
      if (['email', 'first_name', 'last_name', 'phone_number', 'address', 'country', 'newsletter_subscribed'].includes(key)) {
        updateFields.push(`${key} = ?`);
        updateValues.push(value);
      }
    }

    updateFields.push('updated_at = ?');
    updateValues.push(now);
    updateValues.push(userId);

    const query = `UPDATE users SET ${updateFields.join(', ')} WHERE user_id = ?`;
    await conn.query(query, updateValues);

    conn.release();
    console.log('✅ User updated:', userId);
    return { success: true };
  } catch (error) {
    console.error('❌ Error updating user:', error);
    return { success: false, error: error.message };
  }
};

// Verify Password
export const verifyPassword = async (plainPassword, hashedPassword) => {
  try {
    if (!hashedPassword) return false;
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error('❌ Error verifying password:', error);
    return false;
  }
};

// Update User Password
export const updateUserPassword = async (userId, newPassword) => {
  try {
    const conn = await pool.getConnection();
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);
    const now = new Date();

    await conn.query(
      'UPDATE users SET password_hash = ?, updated_at = ? WHERE user_id = ?',
      [passwordHash, now, userId]
    );

    conn.release();
    console.log('✅ Password updated for user:', userId);
    return { success: true };
  } catch (error) {
    console.error('❌ Error updating password:', error);
    return { success: false, error: error.message };
  }
};
