// src/pages/ProfilePage.js
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [editMode, setEditMode] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetch('/api/user/profile', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setProfile(data))
        .catch((error) => console.error('Error:', error));
    }
  }, [user]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(profile),
      })
        .then((response) => response.json())
        .then((data) => {
          setProfile(data);
          setEditMode(false);
        })
        .catch((error) => console.error('Error:', error));
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditMode(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
