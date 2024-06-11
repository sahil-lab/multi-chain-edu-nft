// frontend/src/pages/Admin/ManageUsers.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get('/api/admin/users', {
      headers: { Authorization: `Bearer ${user.token}` }
    })
    .then(response => setUsers(response.data))
    .catch(error => console.error('Error fetching users:', error));
  }, [user]);

  const deleteUser = (id) => {
    axios.delete(`/api/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
    .then(() => setUsers(users.filter(user => user._id !== id)))
    .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <div>
      <h1>Manage Users</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name} ({user.email})
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
