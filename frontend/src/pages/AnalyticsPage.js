// src/pages/AnalyticsPage.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AnalyticsPage = () => {
  const { user } = useContext(AuthContext);
  const [engagementData, setEngagementData] = useState(null);
  const [classPerformanceData, setClassPerformanceData] = useState(null);
  const [financialTransactionsData, setFinancialTransactionsData] = useState(null);

  useEffect(() => {
    if (user) {
      // Fetch engagement analytics data
      axios.get('/api/analytics/engagement', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then(response => setEngagementData(response.data))
        .catch(error => console.error('Error fetching engagement data:', error));

      // Fetch class performance analytics data
      axios.get('/api/analytics/class-performance', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then(response => setClassPerformanceData(response.data))
        .catch(error => console.error('Error fetching class performance data:', error));

      // Fetch financial transactions analytics data
      axios.get('/api/analytics/financial-transactions', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then(response => setFinancialTransactionsData(response.data))
        .catch(error => console.error('Error fetching financial transactions data:', error));
    }
  }, [user]);

  return (
    <div>
      <h1>Analytics Page</h1>
      <section>
        <h2>Engagement Analytics</h2>
        {engagementData ? (
          <pre>{JSON.stringify(engagementData, null, 2)}</pre>
        ) : (
          <p>Loading engagement data...</p>
        )}
      </section>
      <section>
        <h2>Class Performance Analytics</h2>
        {classPerformanceData ? (
          <pre>{JSON.stringify(classPerformanceData, null, 2)}</pre>
        ) : (
          <p>Loading class performance data...</p>
        )}
      </section>
      <section>
        <h2>Financial Transactions Analytics</h2>
        {financialTransactionsData ? (
          <pre>{JSON.stringify(financialTransactionsData, null, 2)}</pre>
        ) : (
          <p>Loading financial transactions data...</p>
        )}
      </section>
    </div>
  );
};

export default AnalyticsPage;
