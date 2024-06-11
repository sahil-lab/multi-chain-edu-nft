const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/register', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
], authController.register);

router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
], authController.login);

router.post('/enable-mfa', auth, authController.enableMFA);
router.post('/verify-mfa', auth, authController.verifyMFA);
router.post('/mfa-login', auth, authController.mfaLogin);

module.exports = router;
