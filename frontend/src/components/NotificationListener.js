import { useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import io from 'socket.io-client';

const NotificationListener = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const socket = io('http://localhost:3001');

    socket.on('notification', (notification) => {
      if (notification.user === user.id) {
        alert(`${notification.type.toUpperCase()}: ${notification.message}`);
      }
    });

    return () => socket.disconnect();
  }, [user]);

  return null;
};

export default NotificationListener;