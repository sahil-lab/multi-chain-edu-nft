// frontend/src/pages/Register.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enableMfa, setEnableMfa] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [token, setToken] = useState('');
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    // Register user logic here
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();

    if (enableMfa && data.token) {
      // Generate MFA secret
      const mfaResponse = await fetch('/api/auth/mfa/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.token}`,
        },
      });
      const mfaData = await mfaResponse.json();
      setQrCode(mfaData.dataUrl);
      setSecret(mfaData.secret);
    } else {
      history.push('/login');
    }
  };

  const handleVerifyMfa = async () => {
    // Verify MFA token logic here
    const response = await fetch('/api/auth/mfa/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ token }),
    });

    if (response.ok) {
      alert('MFA enabled successfully');
      history.push('/login');
    } else {
      alert('Invalid token');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Enable MFA:</label>
          <input type="checkbox" checked={enableMfa} onChange={() => setEnableMfa(!enableMfa)} />
        </div>
        <button type="submit">Register</button>
      </form>
      {qrCode && (
        <div>
          <h2>Scan this QR Code with your Authenticator App</h2>
          <img src={qrCode} alt="MFA QR Code" />
          <div>
            <label>Enter the token from your Authenticator App:</label>
            <input type="text" value={token} onChange={(e) => setToken(e.target.value)} required />
            <button onClick={handleVerifyMfa}>Verify MFA</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
