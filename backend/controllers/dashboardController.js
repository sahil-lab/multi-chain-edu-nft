const User = require('../models/User');
const Service = require('../models/Service');
const Message = require('../models/Message');

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select('-password');
    const services = await Service.find({ teacher: userId });
    const messages = await Message.find({ user: userId });

    res.json({
      user,
      services,
      messages,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dashboard data' });
  }
};
