// frontend/src/api/auth.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth/';

// Register user
const register = async (name, email, password) => {
  const response = await axios.post(API_URL + 'register', {
    name,
    email,
    password,
  });
  return response.data;
};

// Login user
const login = async (email, password) => {
  const response = await axios.post(API_URL + 'login', {
    email,
    password,
  });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

// Get current user
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
