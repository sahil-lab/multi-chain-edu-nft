// src/pages/ServiceListingPage.js
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ServiceListingPage = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: '', description: '' });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetch('/api/services', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setServices(data))
        .catch((error) => console.error('Error:', error));
    }
  }, [user]);

  const createService = () => {
    fetch('/api/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newService),
    })
      .then((response) => response.json())
      .then((service) => {
        setServices([...services, service]);
        setNewService({ name: '', description: '' });
      })
      .catch((error) => console.error('Error:', error));
  };

  const deleteService = (id) => {
    fetch(`/api/services/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then(() => {
        setServices(services.filter((service) => service._id !== id));
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Service Listing Page</h1>
      <div>
        <input
          type="text"
          placeholder="Service Name"
          value={newService.name}
          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Service Description"
          value={newService.description}
          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
        />
        <button onClick={createService}>Create Service</button>
      </div>
      <ul>
        {services.map((service) => (
          <li key={service._id}>
            {service.name} - {service.description}
            <button onClick={() => deleteService(service._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceListingPage;
