// backend/index.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { createNFT } = require('./interact'); // Assuming 'interact.js' contains createNFT function
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/messages', messageRoutes);

app.post('/create-nft', async (req, res) => {
  const { student, tokenURI } = req.body;
  try {
    await createNFT(student, tokenURI);
    res.status(200).send("NFT Created");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating NFT");
  }
});

const server = http.createServer(app);
const io = socketIo(server);

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
