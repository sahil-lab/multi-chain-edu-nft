// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the decentralized educational marketplace app!</p>
      <nav>
        <ul>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/service-listing">Service Listing</Link></li>
          <li><Link to="/messaging">Messaging</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;
