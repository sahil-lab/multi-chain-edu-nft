import React, { useEffect, useRef } from 'react';
import Video from 'twilio-video';

const LiveClassPage = () => {
  const localVideoRef = useRef();

  useEffect(() => {
    const startVideo = async () => {
      const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localVideoRef.current.srcObject = localStream;

      // Get Twilio token from the backend
      const response = await fetch('/api/video/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity: 'teacher' }), // Replace with dynamic identity if needed
      });
      const data = await response.json();

      // Connect to the room
      Video.connect(data.token, { name: 'classroom' }).then((room) => {
        room.localParticipant.videoTracks.forEach(track => {
          const videoElement = track.track.attach();
          localVideoRef.current.appendChild(videoElement);
        });
        room.on('participantConnected', (participant) => {
          participant.tracks.forEach(track => {
            if (track.isSubscribed) {
              const videoElement = track.track.attach();
              document.getElementById('remote-media-div').appendChild(videoElement);
            }
          });
          participant.on('trackSubscribed', (track) => {
            const videoElement = track.attach();
            document.getElementById('remote-media-div').appendChild(videoElement);
          });
        });
      });
    };

    startVideo();
  }, []);

  return (
    <div>
      <h1>Live Class</h1>
      <div ref={localVideoRef} autoPlay muted style={{ width: '300px', height: '200px' }}></div>
      <div id="remote-media-div" style={{ width: '300px', height: '200px' }}></div>
    </div>
  );
};

export default LiveClassPage;