// backend/routes/userRoutes.js
const express = require('express');
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');
const router = express.Router();

// Get user profile
router.get('/profile', auth, userController.getProfile);

// Update user profile
router.put('/profile', auth, userController.updateProfile);

module.exports = router;
