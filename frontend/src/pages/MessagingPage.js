// src/pages/MessagingPage.js
import React, { useState, useEffect } from 'react';

const MessagingPage = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/messages')
      .then(response => response.json())
      .then(data => setMessages(data));
  }, []);

  const sendMessage = () => {
    fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    })
    .then(response => response.status === 201 && setMessages([...messages, { text: message }]))
    .catch(error => console.error('Error:', error));
    setMessage('');
  }

  return (
    <div>
      <h1>Messaging Page</h1>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default MessagingPage;
