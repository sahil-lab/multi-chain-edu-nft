// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ServiceListingPage from './pages/ServiceListingPage';
import MessagingPage from './pages/MessagingPage';
import './App.css';
import './index.css';

const App = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Router>
      <div className="app">
        {user && (
          <nav>
            <button onClick={logout}>Logout</button>
          </nav>
        )}
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/profile" component={ProfilePage} />
          <PrivateRoute path="/service-listing" component={ServiceListingPage} />
          <PrivateRoute path="/messaging" component={MessagingPage} />
          <Route path="/" exact component={HomePage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;