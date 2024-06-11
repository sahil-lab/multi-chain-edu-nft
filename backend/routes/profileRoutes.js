const express = require('express');
const { getProfile, updateProfile, addCompletedCourse, addCertificate } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getProfile);
router.put('/', authMiddleware, updateProfile);
router.post('/completed-course', authMiddleware, addCompletedCourse);
router.post('/certificate', authMiddleware, addCertificate);

module.exports = router;
