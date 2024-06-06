// src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    fetch('/api/profile')
      .then(response => response.json())
      .then(data => setProfile(data));
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      <div>
        <p>Name: {profile.name}</p>
        <p>Email: {profile.email}</p>
      </div>
    </div>
  );
}

export default ProfilePage;
