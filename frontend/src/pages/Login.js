import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [mfaRequired, setMfaRequired] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const { login } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.mfaRequired) {
      setMfaRequired(true);
      setAuthToken(data.token);
    } else {
      login(data.token);
      history.push('/');
    }
  };

  const handleMfaSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/auth/mfa-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();

    if (response.ok) {
      login(data.token);
      history.push('/');
    } else {
      alert('Invalid MFA token');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {!mfaRequired ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      ) : (
        <form onSubmit={handleMfaSubmit}>
          <div className="form-group">
            <label>MFA Token</label>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
          </div>
          <button type="submit">Verify Token</button>
        </form>
      )}
    </div>
  );
};

export default Login;
