const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const paypal = require('paypal-rest-sdk');
const router = express.Router();

// PayPal configuration
paypal.configure({
  mode: 'sandbox', // or 'live' for production
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_SECRET,
});

// Stripe payment route
router.post('/stripe', async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send('Error creating payment');
  }
});

// PayPal payment route
router.post('/paypal', (req, res) => {
  const { amount, currency } = req.body;
  const create_payment_json = {
    intent: 'sale',
    payer: { payment_method: 'paypal' },
    redirect_urls: {
      return_url: 'http://localhost:3001/api/payment/paypal/success',
      cancel_url: 'http://localhost:3001/api/payment/paypal/cancel',
    },
    transactions: [
      {
        amount: { currency, total: amount },
        description: 'Your description here',
      },
    ],
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      res.status(500).send('Error creating payment');
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          res.json({ approvalUrl: payment.links[i].href });
        }
      }
    }
  });
});

// PayPal success route
router.get('/paypal/success', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [{ amount: { currency: 'USD', total: '10.00' } }],
  };

  paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
    if (error) {
      res.status(500).send('Payment execution failed');
    } else {
      res.send('Payment success');
    }
  });
});

// PayPal cancel route
router.get('/paypal/cancel', (req, res) => {
  res.send('Payment cancelled');
});

module.exports = router;
