const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  seatsAvailable: Number,
  price: Number,
  startTime: Date,
  endTime: Date,
  recording: String // URL to the recording
});

module.exports = mongoose.model('Course', CourseSchema);
