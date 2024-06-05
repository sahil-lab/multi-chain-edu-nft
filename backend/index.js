const express = require('express');
const { createNFT } = require('./interact');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
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
