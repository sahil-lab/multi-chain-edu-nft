const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bio: { type: String },
  completedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  certificates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Certificate' }],
});

module.exports = mongoose.model('Profile', profileSchema);
