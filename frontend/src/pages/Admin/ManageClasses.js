// frontend/src/pages/Admin/ManageClasses.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get('/api/admin/classes', {
      headers: { Authorization: `Bearer ${user.token}` }
    })
    .then(response => setClasses(response.data))
    .catch(error => console.error('Error fetching classes:', error));
  }, [user]);

  const deleteClass = (id) => {
    axios.delete(`/api/admin/classes/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
    .then(() => setClasses(classes.filter(classItem => classItem._id !== id)))
    .catch(error => console.error('Error deleting class:', error));
  };

  return (
    <div>
      <h1>Manage Classes</h1>
      <ul>
        {classes.map(classItem => (
          <li key={classItem._id}>
            {classItem.name} - {classItem.description}
            <button onClick={() => deleteClass(classItem._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageClasses;
