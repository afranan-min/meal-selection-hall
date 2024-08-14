import React from 'react';
import '../styles/MealTickOff.css';
const MealTickOff = () => {
  const containerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    backdropFilter: 'blur(8px)', // Blur effect
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999 // Ensure it's above other content
  };

  const contentStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background for content
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '600px',
    width: '90%', // Adjust the width for responsiveness
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Add some shadow for better visibility
  };

  const welcomeStyle = {
    fontWeight: 'bold',
    color: 'black', // Set text color to black
    fontSize: '2.5rem', // Adjust font size for responsiveness
    textShadow: '2px 2px 5px rgba(255, 255, 255, 0.8)' // Light shadow effect
  };

  const smallTextStyle = {
    fontSize: '1rem', // Adjust the font size for the small text
    color: 'black', // Set text color to black
    marginTop: '10px'
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle} className="text-center">
        <h2 style={welcomeStyle}>Meal Tick Time is Off</h2>
        <p style={smallTextStyle}>
          You can only select your meals between 5 PM and 10 PM. Please come back during that time to tick your meals for tomorrow.
        </p>
      </div>
    </div>
  );
};

export default MealTickOff;
