require('dotenv').config();
const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
const adminRoutes = require('./routes/adminRoutes');
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const messageRoutes = require('./routes/messageRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes'); // Add this line
const refundRoutes = require('./routes/refundRoutes');
const reviewRoutes = require('./routes/reviewRoutes'); // Add this line
const { createNFT } = require('./interact');
const http = require('http');
const socketIo = require('socket.io');
const profileRoutes = require('./routes/profileRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const server = http.createServer(app);
const io = socketIo(server);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/refund', refundRoutes);
app.use('/api/reviews', reviewRoutes); // Add this line
app.use('/api/analytics', analyticsRoutes); // Add this line


app.post('/create-nft', async (req, res) => {
  const { student, tokenURI } = req.body;
  try {
    await createNFT(student, tokenURI);
    res.status(200).send('NFT Created');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating NFT');
  }
});

// Twilio Access Token Endpoint
app.post('/api/video/token', (req, res) => {
  const { identity } = req.body;
  const { TWILIO_ACCOUNT_SID, TWILIO_API_KEY_SID, TWILIO_API_KEY_SECRET } = process.env;

  const AccessToken = twilio.jwt.AccessToken;
  const VideoGrant = AccessToken.VideoGrant;

  const token = new AccessToken(TWILIO_ACCOUNT_SID, TWILIO_API_KEY_SID, TWILIO_API_KEY_SECRET);
  token.identity = identity;

  const videoGrant = new VideoGrant();
  token.addGrant(videoGrant);

  res.json({ token: token.toJwt() });
});

// Add payment endpoint
app.post('/api/payment', async (req, res) => {
  const { amount, paymentMethodId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // amount in cents
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
    });

    req.io.emit('notification', {
      type: 'success',
      message: 'Payment successful',
      user: req.userId,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    req.io.emit('notification', {
      type: 'error',
      message: 'Payment failed',
      user: req.userId,
    });
    res.status(500).json({ success: false, error: error.message });
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('message', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
