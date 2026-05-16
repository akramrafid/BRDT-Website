import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { getInvoiceById, getInvoiceByNumber, getUserInvoices } from '../models/Invoice.js';
import { createResponse } from '../utils/helpers.js';

const router = express.Router();

// ==================== GET: Invoice by ID ====================
router.get('/:invoiceId', authenticate, async (req, res, next) => {
  try {
    const { invoiceId } = req.params;

    const result = await getInvoiceById(invoiceId);
    if (!result.success) {
      return res.status(404).json(createResponse('error', result.error));
    }

    // Check authorization
    if (req.user.userId !== result.invoice.user_id) {
      return res.status(403).json(createResponse('error', 'Unauthorized'));
    }

    return res.status(200).json(createResponse('success', 'Invoice retrieved', result.invoice));
  } catch (error) {
    next(error);
  }
});

// ==================== GET: Invoice by Number ====================
router.get('/number/:invoiceNumber', async (req, res, next) => {
  try {
    const { invoiceNumber } = req.params;

    const result = await getInvoiceByNumber(invoiceNumber);
    if (!result.success) {
      return res.status(404).json(createResponse('error', result.error));
    }

    return res.status(200).json(createResponse('success', 'Invoice retrieved', result.invoice));
  } catch (error) {
    next(error);
  }
});

// ==================== GET: User Invoices ====================
router.get('/user/:userId', authenticate, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { limit = 50, offset = 0 } = req.query;

    // Check if user is accessing their own invoices
    if (req.user.userId !== userId) {
      return res.status(403).json(createResponse('error', 'Unauthorized'));
    }

    const result = await getUserInvoices(userId, parseInt(limit), parseInt(offset));
    if (!result.success) {
      return res.status(400).json(createResponse('error', result.error));
    }

    return res.status(200).json(createResponse('success', 'Invoices retrieved', result.invoices));
  } catch (error) {
    next(error);
  }
});

export default router;
