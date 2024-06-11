import React, { useState } from 'react';
import WalletConnect from '../components/WalletConnect';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckoutForm from '../components/StripeCheckoutForm';
import PayPalButton from '../components/PayPalButton';
import Web3 from 'web3';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = () => {
  const [wallet, setWallet] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('ETH'); // Default to ETH

  const handlePayment = async () => {
    if (wallet && chainId) {
      const accounts = await wallet.eth.getAccounts();
      let value;

      if (currency === 'USDT') {
        const usdtContract = new wallet.eth.Contract([
          // USDT ABI simplified for transfer function
          {
            "constant": false,
            "inputs": [
              { "name": "_to", "type": "address" },
              { "name": "_value", "type": "uint256" }
            ],
            "name": "transfer",
            "outputs": [{ "name": "", "type": "bool" }],
            "type": "function"
          }
        ], 'usdt_contract_address'); // Replace with actual USDT contract address

        value = Web3.utils.toWei(amount, 'mwei'); // USDT typically uses 6 decimals
        usdtContract.methods.transfer('recipient_wallet_address', value)
          .send({ from: accounts[0] })
          .then(() => {
            alert('Payment Successful');
          })
          .catch(err => {
            console.error(err);
            alert('Payment Failed');
          });
      } else if (currency === 'ARB') {
        // Implement Arbitrum-specific transfer logic
        const arbitrumRecipientAddress = 'arbitrum_recipient_address'; // Replace with actual recipient address
        value = Web3.utils.toWei(amount, 'ether');
        wallet.eth.sendTransaction({
          from: accounts[0],
          to: arbitrumRecipientAddress,
          value,
        })
          .then(() => {
            alert('Payment Successful');
          })
          .catch(err => {
            console.error(err);
            alert('Payment Failed');
          });
      } else if (currency === 'AVAX') {
        // Implement Avalanche-specific transfer logic
        const avaxRecipientAddress = 'avax_recipient_address'; // Replace with actual recipient address
        value = Web3.utils.toWei(amount, 'ether');
        wallet.eth.sendTransaction({
          from: accounts[0],
          to: avaxRecipientAddress,
          value,
        })
          .then(() => {
            alert('Payment Successful');
          })
          .catch(err => {
            console.error(err);
            alert('Payment Failed');
          });
      } else if (currency === 'BNB') {
        // Implement Binance Smart Chain-specific transfer logic
        const bnbRecipientAddress = 'bnb_recipient_address'; // Replace with actual recipient address
        value = Web3.utils.toWei(amount, 'ether');
        wallet.eth.sendTransaction({
          from: accounts[0],
          to: bnbRecipientAddress,
          value,
        })
          .then(() => {
            alert('Payment Successful');
          })
          .catch(err => {
            console.error(err);
            alert('Payment Failed');
          });
      } else {
        // Default ETH transfer logic
        const recipientAddress = 'eth_recipient_address'; // Replace with actual recipient address
        value = Web3.utils.toWei(amount, 'ether');
        wallet.eth.sendTransaction({
          from: accounts[0],
          to: recipientAddress,
          value,
        })
          .then(() => {
            alert('Payment Successful');
          })
          .catch(err => {
            console.error(err);
            alert('Payment Failed');
          });
      }

      setAmount('');
    } else {
      alert('Please connect your wallet first');
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div>
      <h1>Payment Page</h1>
      <input
        type="number"
        value={amount}
        onChange={handleAmountChange}
        placeholder="Enter amount"
      />
      <Elements stripe={stripePromise}>
        <StripeCheckoutForm amount={amount} />
      </Elements>
      <PayPalButton amount={amount} />
      <WalletConnect setWallet={setWallet} setChainId={setChainId} />
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder={`Enter amount in ${currency}`}
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="ETH">ETH</option>
        <option value="USDT">USDT</option>
        <option value="AVAX">AVAX</option>
        <option value="BNB">BNB</option>
        <option value="ARB">ARB</option>
      </select>
      <button onClick={handlePayment}>Pay with Crypto</button>
    </div>
  );
};

export default PaymentPage;
