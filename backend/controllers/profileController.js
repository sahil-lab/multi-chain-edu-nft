const Profile = require('../models/Profile');
const Course = require('../models/Course');
const Certificate = require('../models/Certificate');

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.userId })
      .populate('completedCourses')
      .populate('certificates');
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profile' });
  }
};

exports.updateProfile = async (req, res) => {
  const { bio } = req.body;
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.userId },
      { bio },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Error updating profile' });
  }
};

exports.addCompletedCourse = async (req, res) => {
  const { courseId } = req.body;
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.userId },
      { $addToSet: { completedCourses: courseId } },
      { new: true }
    );
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Error adding completed course' });
  }
};

exports.addCertificate = async (req, res) => {
  const { certificateId } = req.body;
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.userId },
      { $addToSet: { certificates: certificateId } },
      { new: true }
    );
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Error adding certificate' });
  }
};
