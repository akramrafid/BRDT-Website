import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Payment Intent for One-Off Donation
export const createPaymentIntent = async (amount, currency = 'gbp', metadata = {}) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata,
      description: `BRDT Charity Donation - ${metadata.appealType || 'General'}`,
      statement_descriptor: 'BRDT CHARITY'
    });

    console.log('✅ Payment intent created:', paymentIntent.id);
    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
      intentId: paymentIntent.id
    };
  } catch (error) {
    console.error('❌ Error creating payment intent:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Confirm Payment Intent
export const confirmPaymentIntent = async (intentId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(intentId);

    if (paymentIntent.status === 'succeeded') {
      return {
        success: true,
        status: 'completed',
        transactionId: paymentIntent.id,
        amount: paymentIntent.amount / 100
      };
    } else if (paymentIntent.status === 'processing') {
      return {
        success: true,
        status: 'processing',
        transactionId: paymentIntent.id
      };
    } else {
      return {
        success: false,
        status: 'failed',
        error: 'Payment failed'
      };
    }
  } catch (error) {
    console.error('❌ Error confirming payment:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Create Subscription for Monthly Donation
export const createSubscription = async (customerId, priceId, metadata = {}) => {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      metadata,
      collection_method: 'charge_automatically'
    });

    console.log('✅ Subscription created:', subscription.id);
    return {
      success: true,
      subscriptionId: subscription.id,
      status: subscription.status
    };
  } catch (error) {
    console.error('❌ Error creating subscription:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Create Customer
export const createCustomer = async (email, name, metadata = {}) => {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
      metadata
    });

    console.log('✅ Customer created:', customer.id);
    return {
      success: true,
      customerId: customer.id
    };
  } catch (error) {
    console.error('❌ Error creating customer:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Handle Webhook Events
export const handleWebhookEvent = async (event) => {
  switch (event.type) {
    case 'payment_intent.succeeded':
      console.log('✅ Payment succeeded:', event.data.object.id);
      return {
        type: 'payment_succeeded',
        transactionId: event.data.object.id,
        amount: event.data.object.amount / 100
      };

    case 'payment_intent.payment_failed':
      console.log('❌ Payment failed:', event.data.object.id);
      return {
        type: 'payment_failed',
        transactionId: event.data.object.id,
        error: event.data.object.last_payment_error?.message
      };

    case 'customer.subscription.updated':
      console.log('✅ Subscription updated:', event.data.object.id);
      return {
        type: 'subscription_updated',
        subscriptionId: event.data.object.id
      };

    case 'invoice.payment_succeeded':
      console.log('✅ Invoice payment succeeded:', event.data.object.id);
      return {
        type: 'invoice_paid',
        invoiceId: event.data.object.id
      };

    default:
      console.log('ℹ️ Unhandled event type:', event.type);
      return { type: 'unknown' };
  }
};

// Verify Webhook Signature
export const verifyWebhookSignature = (rawBody, signature) => {
  try {
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    return { valid: true, event };
  } catch (error) {
    console.error('❌ Webhook signature verification failed:', error.message);
    return { valid: false, error: error.message };
  }
};
