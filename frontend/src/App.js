// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ServiceListingPage from './pages/ServiceListingPage';
import MessagingPage from './pages/MessagingPage';
import './App.css';
import './index.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/service-listing" element={<ServiceListingPage />} />
          <Route path="/messaging" element={<MessagingPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
