import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeaAvailabilityPage = () => {
  const [teaAvailable, setTeaAvailable] = useState(false);

  useEffect(() => {
    // Fetch current tea availability status
    const fetchTeaAvailability = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/get-tea-availability');
        setTeaAvailable(response.data.available);
      } catch (error) {
        console.error('Error fetching tea availability:', error);
      }
    };

    fetchTeaAvailability();
  }, []);

  const handleToggleAvailability = async () => {
    try {
      const response = await axios.put('http://localhost:5000/api/admin/update-tea-availability', {
        available: !teaAvailable,
      });
      setTeaAvailable(response.data.available);
    } catch (error) {
      console.error('Error updating tea availability:', error);
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#282c34',
    color: 'white',
    padding: '20px',
    backgroundImage: 'url("https://wallpapercave.com/wp/wp8747461.jpg")'
  };

  const welcomeStyle = {
    fontWeight: 'bold',
    fontSize: '3rem',
    textShadow: '3px 3px 5px rgba(255, 255, 255, 0.5)',
  };

  const statusTextStyle = {
    fontSize: '1.8rem',
    marginBottom: '20px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
  };

  const buttonStyle = {
    width: '100%',
    maxWidth: '300px',
    fontSize: '1.2rem',
  };

  return (
    <div style={containerStyle}>
      <h2 style={welcomeStyle} className="mb-4">Manage Tea Availability</h2>
      <div style={buttonContainerStyle}>
        <p style={statusTextStyle}>Tea is currently {teaAvailable ? 'available' : 'not available'}.</p>
        <button style={buttonStyle} className="btn btn-light btn-lg" onClick={handleToggleAvailability} >
          {teaAvailable ? 'Mark as Not Available' : 'Mark as Available'}
        </button>
      </div>
    </div>
  );
};

export default TeaAvailabilityPage;
