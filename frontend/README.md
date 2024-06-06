# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


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