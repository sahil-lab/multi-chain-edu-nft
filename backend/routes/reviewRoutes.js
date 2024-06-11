const express = require('express');
const { getReviews, createReview } = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:teacherId', getReviews);
router.post('/:teacherId', authMiddleware, createReview);

module.exports = router;
