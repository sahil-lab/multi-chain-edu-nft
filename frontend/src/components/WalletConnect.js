// src/components/WalletConnect.js
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { useWallet as useBscWallet } from '@binance-chain/bsc-use-wallet';
import { useAvalancheWallet } from '@avalabs/avalanche-wallet-sdk';

const WalletConnect = ({ setWallet, setChainId }) => {
  const [account, setAccount] = useState(null);
  const bscWallet = useBscWallet();
  const avaxWallet = useAvalancheWallet();

  useEffect(() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      window.ethereum.enable().then(accounts => {
        setAccount(accounts[0]);
        setWallet(web3);
        setChainId(window.ethereum.chainId);
      });
    } else if (bscWallet.status === 'connected') {
      setAccount(bscWallet.account);
      setWallet(bscWallet.ethereum);
      setChainId('0x38'); // BSC mainnet
    } else if (avaxWallet.status === 'connected') {
      setAccount(avaxWallet.address);
      setWallet(avaxWallet.provider);
      setChainId('0xa86a'); // AVAX mainnet
    } else {
      alert('Please install MetaMask or use a supported wallet!');
    }
  }, [bscWallet, avaxWallet]);

  return (
    <div>
      {account ? (
        <p>Connected: {account}</p>
      ) : (
        <button onClick={() => window.ethereum.enable()}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnect;
