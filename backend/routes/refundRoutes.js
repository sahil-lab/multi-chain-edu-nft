// backend/routes/refundRoutes.js
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Attendance = require('../models/Attendance');
const Payment = require('../models/Payment');

const router = express.Router();

router.post('/refund', async (req, res) => {
  const { studentId, classId, paymentIntentId } = req.body;

  try {
    const attendance = await Attendance.findOne({ studentId, classId });

    if (!attendance || !attendance.attended) {
      const refund = await stripe.refunds.create({
        payment_intent: paymentIntentId,
      });

      res.status(200).json({ success: true, refund });
    } else {
      res.status(400).json({ success: false, message: 'Student attended the class' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
