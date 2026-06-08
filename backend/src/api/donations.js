import express from 'express';
import { validateDonation } from '../middleware/validation.js';
import { authenticate, optional } from '../middleware/auth.js';
import { createDonation, getDonationById, getUserDonations, updateDonationStatus, getDonationsBySegment } from '../models/Donation.js';
import { generateId, createResponse } from '../utils/helpers.js';

const router = express.Router();

// ==================== POST: Submit Donation Form ====================
router.post('/submit', optional, validateDonation, async (req, res, next) => {
  try {
    const { 
      segment, 
      specificCause, 
      amount, 
      paymentMethod, 
      senderAccountNumber, 
      transactionId, 
      firstName, 
      lastName, 
      email, 
      phoneNumber 
    } = req.body;
    
    const userId = req.user?.userId || null; // If user is logged in, attach their ID

    // Create donation record. Status is 'pending' by default.
    const donationResult = await createDonation({
      userId,
      segment,
      specificCause,
      amount,
      paymentMethod,
      senderAccountNumber,
      transactionId,
      firstName,
      lastName,
      email,
      phoneNumber
    });

    if (!donationResult.success) {
      return res.status(400).json(createResponse('error', donationResult.error));
    }

    // TODO: In a production app, if payment method is Stripe, we would return a clientSecret here.
    // For manual methods like bKash/Nagad, we just return success and an admin will verify the transactionId.

    return res.status(201).json(createResponse('success', 'Donation submitted successfully. We will verify your transaction shortly.', {
      donationId: donationResult.donationId,
      amount,
      status: 'pending'
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

export default router;
