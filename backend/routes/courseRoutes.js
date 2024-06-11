const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/book', async (req, res) => {
  const { courseId, studentId, paymentMethodId } = req.body;
  
  const course = await Course.findById(courseId);
  if (!course) return res.status(404).send('Course not found');
  if (course.seatsAvailable <= 0) return res.status(400).send('No seats available');
  
  const amount = course.price * 100; // Convert to cents

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true
    });

    const enrollment = new Enrollment({
      course: courseId,
      student: studentId,
      paymentStatus: 'Paid'
    });
    await enrollment.save();

    course.seatsAvailable -= 1;
    await course.save();

    res.status(200).json({ success: true, enrollmentId: enrollment._id });
  } catch (error) {
    res.status(500).send('Payment failed');
  }
});

router.post('/refund', async (req, res) => {
  const { enrollmentId } = req.body;
  const enrollment = await Enrollment.findById(enrollmentId).populate('course');

  if (!enrollment) return res.status(404).send('Enrollment not found');
  if (enrollment.joined) return res.status(400).send('Cannot refund after joining the class');

  try {
    await stripe.refunds.create({ payment_intent: enrollment.paymentIntentId });
    enrollment.paymentStatus = 'Refunded';
    await enrollment.save();

    enrollment.course.seatsAvailable += 1;
    await enrollment.course.save();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).send('Refund failed');
  }
});

module.exports = router;
