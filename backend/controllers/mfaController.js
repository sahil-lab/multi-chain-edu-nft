// backend/controllers/mfaController.js
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const User = require('../models/User');

exports.generateMfaSecret = async (req, res) => {
  const secret = speakeasy.generateSecret({ length: 20 });
  const url = speakeasy.otpauthURL({
    secret: secret.base32,
    label: req.user.email,
    issuer: 'YourAppName',
  });

  await User.findByIdAndUpdate(req.user.id, {
    mfaSecret: secret.base32,
    isMfaEnabled: false,
  });

  qrcode.toDataURL(url, (err, dataUrl) => {
    if (err) {
      return res.status(500).send('Error generating QR code');
    }
    res.json({ secret: secret.base32, dataUrl });
  });
};

exports.verifyMfaToken = async (req, res) => {
  const { token } = req.body;
  const user = await User.findById(req.user.id);

  const verified = speakeasy.totp.verify({
    secret: user.mfaSecret,
    encoding: 'base32',
    token,
  });

  if (verified) {
    await User.findByIdAndUpdate(req.user.id, { isMfaEnabled: true });
    res.send('MFA enabled successfully');
  } else {
    res.status(400).send('Invalid token');
  }
};

exports.verifyLoginMfaToken = async (req, res) => {
  const { token, email } = req.body;
  const user = await User.findOne({ email });

  const verified = speakeasy.totp.verify({
    secret: user.mfaSecret,
    encoding: 'base32',
    token,
  });

  if (verified) {
    res.send('MFA verification successful');
  } else {
    res.status(400).send('Invalid token');
  }
};
