// backend/controllers/analyticsController.js
const { google } = require('googleapis');
const mongoose = require('mongoose');
const Class = require('../models/Class');
const Payment = require('../models/Payment');

// Google Analytics Setup
const analyticsreporting = google.analyticsreporting('v4');

const getAnalyticsData = async (viewId, startDate, endDate) => {
  const response = await analyticsreporting.reports.batchGet({
    requestBody: {
      reportRequests: [
        {
          viewId: viewId,
          dateRanges: [
            {
              startDate: startDate,
              endDate: endDate,
            },
          ],
          metrics: [
            { expression: 'ga:sessions' },
            { expression: 'ga:pageviews' },
            { expression: 'ga:users' },
          ],
        },
      ],
    },
  });
  return response.data;
};

exports.getEngagementAnalytics = async (req, res) => {
  try {
    const data = await getAnalyticsData('YOUR_VIEW_ID', '30daysAgo', 'today');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching engagement analytics' });
  }
};

exports.getClassPerformanceAnalytics = async (req, res) => {
  try {
    const classPerformance = await Class.aggregate([
      {
        $group: {
          _id: "$teacher",
          totalStudents: { $sum: "$studentsCount" },
          averageRating: { $avg: "$rating" }
        }
      }
    ]);
    res.json(classPerformance);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching class performance analytics' });
  }
};

exports.getFinancialTransactionsAnalytics = async (req, res) => {
  try {
    const financialTransactions = await Payment.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          transactionCount: { $sum: 1 }
        }
      }
    ]);
    res.json(financialTransactions);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching financial transactions analytics' });
  }
};
