import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const welcomeStyle = {
    fontWeight: 'bold',
    color: 'white',
    fontSize: '6rem',
    textShadow: '3px 3px 5px rgba(255, 255, 255, 0.5)',
    textAlign: 'center', // Center text for all devices
  };

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#282c34',
    backgroundImage: 'url("https://wallpapercave.com/wp/wp8747461.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div
      className="container-fluid d-flex flex-column justify-content-center align-items-center"
      style={containerStyle}
    >
      <h1 style={welcomeStyle} className="mb-4">Welcome</h1>
      <div className="row justify-content-center w-100">
        <div className="col-12 col-md-auto mb-3 mb-md-0">
          <Link to="/admin-login" className="btn btn-light btn-lg w-100 rounded-pill">Admin</Link>
        </div>
        <div className="col-12 col-md-auto">
          <Link to="/student-login" className="btn btn-light btn-lg w-100 rounded-pill">Student</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
