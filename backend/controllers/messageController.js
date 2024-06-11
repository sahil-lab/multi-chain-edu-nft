const Message = require('../models/Message');

// Get Messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate('user', 'name email');
    res.json(messages);

    req.io.emit('notification', {
      type: 'info',
      message: 'Messages have been fetched.',
      user: req.userId
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching messages' });
  }
};

// Create Message
exports.createMessage = async (req, res) => {
  const { text } = req.body;
  try {
    const message = new Message({ text, user: req.userId });
    await message.save();

    req.io.emit('notification', {
      type: 'success',
      message: 'A new message has been created.',
      user: req.userId
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Error creating message' });
  }
};
