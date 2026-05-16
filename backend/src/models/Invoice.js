import pool from '../config/database.js';
import { generateId, generateInvoiceNumber } from '../utils/helpers.js';

// Create Invoice
export const createInvoice = async (invoiceData) => {
  try {
    const conn = await pool.getConnection();
    const invoiceId = generateId();
    const invoiceNumber = generateInvoiceNumber();
    const now = new Date();

    const {
      donationId,
      userId,
      amount,
      currency = 'BDT',
      appealType,
      status = 'generated',
      pdfUrl = null
    } = invoiceData;

    await conn.query(
      `INSERT INTO invoices 
       (invoice_id, donation_id, invoice_number, user_id, amount, currency, appeal_type, invoice_date, status, pdf_url, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [invoiceId, donationId, invoiceNumber, userId, amount, currency, appealType, now, status, pdfUrl, now, now]
    );

    conn.release();
    console.log('✅ Invoice created:', invoiceNumber);
    return { success: true, invoiceId, invoiceNumber };
  } catch (error) {
    console.error('❌ Error creating invoice:', error);
    return { success: false, error: error.message };
  }
};

// Get Invoice by ID
export const getInvoiceById = async (invoiceId) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM invoices WHERE invoice_id = ?', [invoiceId]);
    conn.release();

    if (rows.length === 0) {
      return { success: false, error: 'Invoice not found' };
    }

    return { success: true, invoice: rows[0] };
  } catch (error) {
    console.error('❌ Error getting invoice:', error);
    return { success: false, error: error.message };
  }
};

// Get Invoice by Number
export const getInvoiceByNumber = async (invoiceNumber) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM invoices WHERE invoice_number = ?', [invoiceNumber]);
    conn.release();

    if (rows.length === 0) {
      return { success: false, error: 'Invoice not found' };
    }

    return { success: true, invoice: rows[0] };
  } catch (error) {
    console.error('❌ Error getting invoice:', error);
    return { success: false, error: error.message };
  }
};

// Update Invoice Status
export const updateInvoiceStatus = async (invoiceId, status) => {
  try {
    const conn = await pool.getConnection();
    const now = new Date();

    await conn.query(
      'UPDATE invoices SET status = ?, updated_at = ? WHERE invoice_id = ?',
      [status, now, invoiceId]
    );

    conn.release();
    console.log('✅ Invoice status updated:', invoiceId);
    return { success: true };
  } catch (error) {
    console.error('❌ Error updating invoice:', error);
    return { success: false, error: error.message };
  }
};

// Mark Invoice as Sent
export const markInvoiceAsSent = async (invoiceId) => {
  try {
    const conn = await pool.getConnection();
    const now = new Date();

    await conn.query(
      'UPDATE invoices SET email_sent = TRUE, email_sent_at = ?, status = "sent", updated_at = ? WHERE invoice_id = ?',
      [now, now, invoiceId]
    );

    conn.release();
    console.log('✅ Invoice marked as sent:', invoiceId);
    return { success: true };
  } catch (error) {
    console.error('❌ Error marking invoice as sent:', error);
    return { success: false, error: error.message };
  }
};

// Get User Invoices
export const getUserInvoices = async (userId, limit = 50, offset = 0) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query(
      'SELECT * FROM invoices WHERE user_id = ? ORDER BY invoice_date DESC LIMIT ? OFFSET ?',
      [userId, limit, offset]
    );
    conn.release();

    return { success: true, invoices: rows };
  } catch (error) {
    console.error('❌ Error getting invoices:', error);
    return { success: false, error: error.message };
  }
};
