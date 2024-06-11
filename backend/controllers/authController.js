const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      mfaEnabled: false,
    });

    await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const payload = { userId: user._id };

    if (user.mfaEnabled) {
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ mfaRequired: true, token });
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.enableMFA = async (req, res) => {
  const { userId } = req.user;

  const secret = speakeasy.generateSecret();
  const url = speakeasy.otpauthURL({ secret: secret.base32, label: req.user.email, algorithm: 'sha512' });

  await User.findByIdAndUpdate(userId, { mfaSecret: secret.base32 });

  qrcode.toDataURL(url, (err, dataURL) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error generating QR code');
    }
    res.status(200).json({ dataURL });
  });
};

exports.verifyMFA = async (req, res) => {
  const { userId } = req.user;
  const { token } = req.body;

  const user = await User.findById(userId);

  const verified = speakeasy.totp.verify({
    secret: user.mfaSecret,
    encoding: 'base32',
    token,
  });

  if (verified) {
    await User.findByIdAndUpdate(userId, { mfaEnabled: true });
    res.status(200).send('MFA verified and enabled');
  } else {
    res.status(400).send('Invalid MFA token');
  }
};

exports.mfaLogin = async (req, res) => {
  const { token } = req.body;
  const { userId } = req.user;

  const user = await User.findById(userId);

  const verified = speakeasy.totp.verify({
    secret: user.mfaSecret,
    encoding: 'base32',
    token,
  });

  if (verified) {
    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token: jwtToken });
  } else {
    res.status(400).send('Invalid MFA token');
  }
};
