// backend/index.js
const express = require('express');
const cors = require('cors');
const { createNFT } = require('./interact'); // Assuming 'interact.js' contains createNFT function
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let profile = { name: 'John Doe', email: 'john.doe@example.com' };
let services = [
  { id: 1, name: 'Service 1', description: 'Description 1' },
  { id: 2, name: 'Service 2', description: 'Description 2' },
];
let messages = [{ text: 'Hello, this is a test message' }];

app.get('/api/profile', (req, res) => {
  res.json(profile);
});

app.get('/api/services', (req, res) => {
  res.json(services);
});

app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.post('/api/messages', (req, res) => {
  messages.push({ text: req.body.message });
  res.status(201).send();
});

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
