const Review = require('../models/Review');

// Get Reviews for a Teacher
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ teacher: req.params.teacherId }).populate('user', 'name');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reviews' });
  }
};

// Create a Review
exports.createReview = async (req, res) => {
  const { rating, comment } = req.body;
  try {
    const review = new Review({
      user: req.userId,
      teacher: req.params.teacherId,
      rating,
      comment,
    });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Error creating review' });
  }
};
