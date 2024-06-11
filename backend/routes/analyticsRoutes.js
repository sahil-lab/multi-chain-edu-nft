// backend/routes/analyticsRoutes.js
const express = require('express');
const { getEngagementAnalytics, getClassPerformanceAnalytics, getFinancialTransactionsAnalytics } = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/auth'); // Add this line

const router = express.Router();

router.get('/engagement', authMiddleware, getEngagementAnalytics);
router.get('/class-performance', authMiddleware, getClassPerformanceAnalytics);
router.get('/financial-transactions', authMiddleware, getFinancialTransactionsAnalytics);

module.exports = router;
