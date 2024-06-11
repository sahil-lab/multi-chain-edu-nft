// backend/payment.js
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_API_KEY));

async function processPayment(txHash) {
  const receipt = await web3.eth.getTransactionReceipt(txHash);
  // Verify transaction details
  return receipt.status;
}

module.exports = { processPayment };
