import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    if (user) {
      axios.get('/api/dashboard', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(response => setDashboardData(response.data))
      .catch(error => console.error('Error:', error));
    }
  }, [user]);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Profile</h2>
        <p>Name: {dashboardData.user.name}</p>
        <p>Email: {dashboardData.user.email}</p>
      </div>
      <div>
        <h2>Enrolled Classes</h2>
        <ul>
          {dashboardData.services.map(service => (
            <li key={service._id}>{service.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Messages</h2>
        <ul>
          {dashboardData.messages.map(message => (
            <li key={message._id}>{message.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
