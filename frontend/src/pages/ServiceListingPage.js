// src/pages/ServiceListingPage.js
import React, { useState, useEffect } from 'react';

const ServiceListingPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('/api/services')
      .then(response => response.json())
      .then(data => setServices(data));
  }, []);

  return (
    <div>
      <h1>Service Listing Page</h1>
      <ul>
        {services.map(service => (
          <li key={service.id}>{service.name} - {service.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default ServiceListingPage;
