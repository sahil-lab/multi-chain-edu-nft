// frontend/src/pages/HomePage.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the decentralized educational marketplace app!</p>
      {user ? (
        <div>
          <button onClick={logout}>Logout</button>
          <nav>
            <ul>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/service-listing">Service Listing</Link></li>
              <li><Link to="/messaging">Messaging</Link></li>
            </ul>
          </nav>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;