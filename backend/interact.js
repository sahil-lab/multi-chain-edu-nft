const { ethers } = require("ethers");
const fs = require("fs");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);

const contractAddress = "YOUR_CONTRACT_ADDRESS";
const contractABI = JSON.parse(fs.readFileSync("artifacts/contracts/EduNFT.sol/EduNFT.json")).abi;

const eduNFT = new ethers.Contract(contractAddress, contractABI, wallet);

async function createNFT(student, tokenURI) {
    const tx = await eduNFT.createNFT(student, tokenURI);
    await tx.wait();
    console.log("NFT Created: ", tx.hash);
}

module.exports = { createNFT };
