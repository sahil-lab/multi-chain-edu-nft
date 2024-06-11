import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
  const [profile, setProfile] = useState({ name: '', email: '', bio: '', completedCourses: [], certificates: [] });
  const [editMode, setEditMode] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetch('/api/profile', {
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
      fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ bio: profile.bio }),
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
      <div>
        <h2>Bio</h2>
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
          </form>
        ) : (
          <div>
            <p>{profile.bio}</p>
            <button onClick={() => setEditMode(true)}>Edit</button>
          </div>
        )}
      </div>
      <div>
        <h2>Completed Courses</h2>
        <ul>
          {profile.completedCourses && profile.completedCourses.map((course) => (
            <li key={course._id}>{course.title}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Certificates</h2>
        <ul>
          {profile.certificates && profile.certificates.map((certificate) => (
            <li key={certificate._id}>
              <a href={certificate.tokenURI} target="_blank" rel="noopener noreferrer">View Certificate</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
