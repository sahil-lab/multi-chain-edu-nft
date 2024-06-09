// backend/routes/messageRoutes.js
const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Message = require('../models/Message');
const router = express.Router();
const io = require('../index').io; // Importing io instance

// Get all messages
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create a new message
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { text } = req.body;

    try {
      const newMessage = new Message({
        user: req.user.id,
        text,
      });

      const message = await newMessage.save();
      
      io.emit('message', message); // Emit the message to all connected clients
      
      res.json(message);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
