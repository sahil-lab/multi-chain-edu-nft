// src/pages/MessagingPage.js
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import io from 'socket.io-client';

const MessagingPage = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const { user } = useContext(AuthContext);
  const socket = io('http://localhost:3001'); // Connect to the Socket.io server

  useEffect(() => {
    if (user) {
      fetch('/api/messages', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setMessages(data))
        .catch((error) => console.error('Error:', error));

      socket.on('message', (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [user, socket]);

  const sendMessage = () => {
    if (user) {
      fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ text: message }),
      })
        .then((response) => {
          if (response.status === 201) {
            setMessage('');
          }
        })
        .catch((error) => console.error('Error:', error));
    }
  };

  if (!user) {
    return <p>Please log in to view and send messages.</p>;
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
};

export default MessagingPage;
