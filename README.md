# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node te
npx hardhat ignition deploy ./ignition/modules/Lock.js
```
# Multi-Chain Educational NFT Project

## Overview

This project involves creating a multi-chain educational NFT system that operates on Ethereum, Binance Smart Chain (BSC), Avalanche (AVAX), and Arbitrum. The project includes smart contracts for each blockchain, a backend built with Express.js, and a frontend built with React.

### Achievements So Far

1. **Development Environment Setup**: Installed and configured necessary development tools including Node.js, npm, Hardhat, and OpenZeppelin contracts.
2. **Smart Contract Development**: 
    - Created and tested NFT smart contracts for Ethereum, BSC, AVAX, and Arbitrum.
    - Deployed contracts on local testnets.
    - Written unit tests for the smart contracts.
3. **Backend Development**: Set up an Express.js backend to interact with the smart contracts.
4. **Frontend Development**: Created a React app to provide a user interface for the NFT system.
5. **Optimization**: Optimized the smart contracts for gas efficiency and performance.

## Tools and Versions Used

- **Node.js**: v18.16.1
- **npm**: v8.18.0
- **Hardhat**: v2.22.5
- **OpenZeppelin Contracts**: v4.7.0
- **Solidity**: v0.8.20, v0.8.24
- **Express.js**: v4.17.1
- **React**: v18.2.0
- **Ethers.js**: v6.1.0
- **dotenv**: v16.0.0

## Important Commands

### Development Environment Setup

1. **Initialize Project**:

    ```sh
    mkdir multi-chain-edu-nft
    cd multi-chain-edu-nft
    npm init -y
    ```

2. **Install Dependencies**:

    ```sh
    npm install --save-dev hardhat
    npm install @openzeppelin/contracts
    npm install --save-dev @nomicfoundation/hardhat-toolbox@^5.0.0 --legacy-peer-deps
    npm install --save ethers dotenv
    ```

3. **Initialize Hardhat**:

    ```sh
    npx hardhat
    ```

4. **Install Backend and Frontend Dependencies**:

    ```sh
    cd backend
    npm init -y
    npm install express dotenv
    cd ../frontend
    npx create-react-app .
    npm install web3 ethers
    ```

### Hardhat Commands

1. **Compile Contracts**:

    ```sh
    npx hardhat compile
    ```

2. **Deploy Contracts**:

    ```sh
    npx hardhat run scripts/deploy.js --network localhost
    ```

3. **Run Tests**:

    ```sh
    npx hardhat test
    ```

### Git Commands

1. **Initialize Git Repository**:

    ```sh
    git init
    git remote add origin https://github.com/sahil-lab/multi-chain-edu-nft.git
    git add .
    git commit -m "Initial commit"
    ```

2. **Push to GitHub**:

    ```sh
    git push -u origin master
    ```

## Cloning and Setting Up on Another PC

1. **Clone the Repository**:

    ```sh
    git clone https://github.com/sahil-lab/multi-chain-edu-nft.git
    cd multi-chain-edu-nft
    ```

2. **Install Project Dependencies**:

    ```sh
    npm install
    cd backend
    npm install
    cd ../frontend
    npm install
    ```

3. **Setup Environment Variables**:

    Create a `.env` file in the root directory and add the following:

    ```makefile
    INFURA_API_KEY=your_infura_api_key
    PRIVATE_KEY=your_private_key
    ```

4. **Compile Contracts**:

    ```sh
    npx hardhat compile
    ```

5. **Deploy Contracts**:

    ```sh
    npx hardhat run scripts/deploy.js --network localhost
    ```

6. **Run the Backend**:

    ```sh
    cd backend
    node index.js
    ```

7. **Run the Frontend**:

    ```sh
    cd frontend
    npm start
    ```

This README file should provide a comprehensive guide for setting up the project on another PC and understanding the current state of the project. If you have any questions or need further assistance, feel free to ask!
CertiMint - Multi-Chain Educational NFT Marketplace
Overview

Today, we focused on setting up both the frontend and backend for the CertiMint project. The tasks included creating a React application for the frontend, setting up an Express server for the backend, and integrating smart contract interactions. We also implemented routes for various pages and set up user authentication.
Frontend
Directory Structure

    frontend/
        node_modules/
        public/
        src/
            components/
            pages/
                HomePage.js
                Login.js
                MessagingPage.js
                ProfilePage.js
                Register.js
                ServiceListingPage.js
            App.css
            App.js
            index.css
            index.js

Pages Created

    Login Page: Basic login form with email and password fields, handling user login logic.
    Register Page: Basic registration form with name, email, and password fields, handling user registration logic.
    Home Page: Displays a welcome message.
    Messaging Page: Basic UI for messaging functionality.
    Profile Page: Displays user profile information.
    Service Listing Page: UI for listing and viewing services.

Main App Component

    Set up routing using react-router-dom.
    Routes for Home, Login, Register, Profile, Service Listing, and Messaging pages.

Backend
Directory Structure

    backend/
        node_modules/
        index.js
        interact.js
        package.json
        package-lock.json

Backend Server

    Set up an Express server.
    Created routes for creating NFTs.

Smart Contract Interaction

    Functions for interacting with smart contracts, such as creating NFTs on the blockchain.

Summary

    Set up the frontend and backend structure.
    Created basic UI pages for login, registration, home, profile, services, and messaging.
    Set up routing for different pages in the React app.
    Created an Express server to handle API requests.
    Implemented smart contract interaction logic in the backend.

This README file provides an overview of what was accomplished today and the current state of the project without including any code snippets. Feel free to update it as the project progresses.