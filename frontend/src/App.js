import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import AnalyticsPage from './pages/AnalyticsPage'; // Import AnalyticsPage
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import ManageUsers from './pages/Admin/ManageUsers';
import ManageClasses from './pages/Admin/ManageClasses';
import ServiceListingPage from './pages/ServiceListingPage';
import MessagingPage from './pages/MessagingPage';
import PaymentPage from './pages/PaymentPage';
import LiveClassPage from './pages/LiveClassPage';
import PrivateRoute from './components/PrivateRoute';
import NotificationListener from './components/NotificationListener';
import './App.css';
import './index.css';

const App = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          {user && (
            <nav>
              <button onClick={logout}>Logout</button>
            </nav>
          )}
          <NotificationListener />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/profile" component={ProfilePage} />
            <PrivateRoute path="/service-listing" component={ServiceListingPage} />
            <PrivateRoute path="/messaging" component={MessagingPage} />
            <PrivateRoute path="/payment" component={PaymentPage} />
            <PrivateRoute path="/dashboard" component={DashboardPage} />
            <AdminRoute path="/admin/users" component={ManageUsers} />
            <PrivateRoute path="/analytics" component={AnalyticsPage} />
            <AdminRoute path="/admin/classes" component={ManageClasses} />
            <PrivateRoute path="/live-class/:classId" component={LiveClassPage} />
            <Route path="/" exact component={HomePage} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
