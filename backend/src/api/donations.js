import express from 'express';
import { validateDonation } from '../middleware/validation.js';
import { authenticate, optional } from '../middleware/auth.js';
import { createDonation, getDonationById, getUserDonations, updateDonationStatus, getDonationsByAppeal } from '../models/Donation.js';
import { createInvoice, markInvoiceAsSent } from '../models/Invoice.js';
import { getUserById } from '../models/User.js';
import { generateInvoicePDF, getInvoiceURL } from '../services/pdfService.js';
import { sendDonationConfirmation, sendInvoiceToAdmin } from '../services/emailService.js';
import { createPaymentIntent, confirmPaymentIntent } from '../services/paymentService.js';
import { generateId, createResponse } from '../utils/helpers.js';

const router = express.Router();

// ==================== POST: Create Donation ====================
router.post('/create', optional, validateDonation, async (req, res, next) => {
  try {
    const { amount, donationType, appealType, paymentMethod = 'stripe', isAnonymous = false } = req.body;
    const userId = req.user?.userId || generateId();

    // Create donation record
    const donationResult = await createDonation({
      userId,
      amount,
      donationType,
      appealType,
      paymentMethod,
      paymentStatus: 'pending',
      isAnonymous
    });

    if (!donationResult.success) {
      return res.status(400).json(createResponse('error', donationResult.error));
    }

    // Create payment intent
    const paymentResult = await createPaymentIntent(amount, 'gbp', {
      donationId: donationResult.donationId,
      appealType,
      donationType
    });

    if (!paymentResult.success) {
      return res.status(400).json(createResponse('error', paymentResult.error));
    }

    return res.status(201).json(createResponse('success', 'Donation created', {
      donationId: donationResult.donationId,
      clientSecret: paymentResult.clientSecret,
      intentId: paymentResult.intentId,
      amount,
      currency: 'GBP'
    }));
  } catch (error) {
    next(error);
  }
});

// ==================== POST: Process Donation Payment ====================
router.post('/process', async (req, res, next) => {
  try {
    const { donationId, intentId } = req.body;

    if (!donationId || !intentId) {
      return res.status(400).json(createResponse('error', 'Missing required fields'));
    }

    // Get donation
    const donationResult = await getDonationById(donationId);
    if (!donationResult.success) {
      return res.status(404).json(createResponse('error', 'Donation not found'));
    }

    // Confirm payment
    const paymentResult = await confirmPaymentIntent(intentId);
    if (!paymentResult.success) {
      await updateDonationStatus(donationId, 'failed', intentId);
      return res.status(400).json(createResponse('error', 'Payment processing failed'));
    }

    // Update donation status
    await updateDonationStatus(donationId, paymentResult.status, intentId);

    if (paymentResult.status !== 'completed') {
      return res.status(202).json(createResponse('success', 'Payment processing', { status: paymentResult.status }));
    }

    // Get donor info
    const userResult = await getUserById(donationResult.donation.user_id);
    if (!userResult.success) {
      return res.status(400).json(createResponse('error', 'Donor not found'));
    }

    const donation = donationResult.donation;
    const donor = userResult.user;

    // Generate Invoice
    const invoiceResult = await createInvoice({
      donationId,
      userId: donation.user_id,
      amount: donation.amount,
      currency: donation.currency,
      appealType: donation.appeal_type,
      status: 'generated'
    });

    if (!invoiceResult.success) {
      console.error('Invoice creation failed:', invoiceResult.error);
      // Continue anyway, invoice can be generated later
    }

    // Generate PDF
    const invoiceNumber = invoiceResult.invoiceNumber || `INV-${Date.now()}`;
    let pdfPath = null;

    try {
      pdfPath = await generateInvoicePDF({
        invoiceNumber,
        invoiceDate: new Date(),
        donorName: donor.full_name,
        donorEmail: donor.email,
        donorPhone: donor.phone,
        donorAddress: donor.address,
        donorCountry: donor.country,
        amount: donation.amount,
        donationType: donation.donation_type,
        appealType: donation.appeal_type,
        paymentStatus: 'completed',
        transactionId: intentId,
        status: 'PAID'
      });
    } catch (pdfError) {
      console.error('PDF generation failed:', pdfError);
    }

    // Send emails
    const emailPromises = [];

    // Send to donor
    emailPromises.push(
      sendDonationConfirmation(
        { email: donor.email, fullName: donor.full_name },
        {
          donationId,
          amount: donation.amount,
          donationType: donation.donation_type,
          appealType: donation.appeal_type,
          dateDonated: donation.created_at,
          receiptNumber: invoiceNumber
        },
        pdfPath
      )
    );

    // Send to admin
    emailPromises.push(
      sendInvoiceToAdmin(
        {
          receiptNumber: invoiceNumber,
          donorName: donor.full_name,
          donorEmail: donor.email,
          amount: donation.amount,
          donationType: donation.donation_type,
          appealType: donation.appeal_type,
          paymentStatus: 'completed',
          transactionId: intentId,
          dateDonated: donation.created_at
        },
        pdfPath
      )
    );

    await Promise.all(emailPromises);

    // Mark invoice as sent
    if (invoiceResult.success) {
      await markInvoiceAsSent(invoiceResult.invoiceId);
    }

    return res.status(200).json(createResponse('success', 'Donation completed and invoices sent', {
      donationId,
      invoiceNumber,
      amount: donation.amount,
      status: 'completed'
    }));
  } catch (error) {
    next(error);
  }
});

// ==================== GET: User Donations ====================
router.get('/user/:userId', authenticate, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { limit = 50, offset = 0 } = req.query;

    // Check if user is accessing their own donations
    if (req.user.userId !== userId) {
      return res.status(403).json(createResponse('error', 'Unauthorized'));
    }

    const result = await getUserDonations(userId, parseInt(limit), parseInt(offset));
    if (!result.success) {
      return res.status(400).json(createResponse('error', result.error));
    }

    return res.status(200).json(createResponse('success', 'Donations retrieved', result.donations));
  } catch (error) {
    next(error);
  }
});

// ==================== GET: Donation by ID ====================
router.get('/:donationId', async (req, res, next) => {
  try {
    const { donationId } = req.params;

    const result = await getDonationById(donationId);
    if (!result.success) {
      return res.status(404).json(createResponse('error', result.error));
    }

    return res.status(200).json(createResponse('success', 'Donation retrieved', result.donation));
  } catch (error) {
    next(error);
  }
});

// ==================== GET: Appeal Statistics ====================
router.get('/appeal/:appealType/stats', async (req, res, next) => {
  try {
    const { appealType } = req.params;

    const result = await getDonationsByAppeal(appealType);
    if (!result.success) {
      return res.status(400).json(createResponse('error', result.error));
    }

    return res.status(200).json(createResponse('success', 'Appeal statistics', result.data));
  } catch (error) {
    next(error);
  }
});

export default router;
