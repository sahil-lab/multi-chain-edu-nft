// backend/routes/adminRoutes.js
const express = require('express');
const { verifyAdmin } = require('../middleware/authMiddleware');
const { getUsers, updateUser, deleteUser, getClasses, updateClass, deleteClass } = require('../controllers/adminController');
const router = express.Router();

router.use(verifyAdmin);

router.get('/users', getUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.get('/classes', getClasses);
router.put('/classes/:id', updateClass);
router.delete('/classes/:id', deleteClass);

module.exports = router;
