const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  issueDate: { type: Date, default: Date.now },
  tokenURI: { type: String, required: true },
});

module.exports = mongoose.model('Certificate', certificateSchema);
