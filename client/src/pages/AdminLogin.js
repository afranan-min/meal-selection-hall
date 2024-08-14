import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminLogin.css';
import axios from 'axios';
const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login-admin', { password });

      if (response.status === 200) {
        // Store the token (optional, if you are using token-based authentication)
        localStorage.setItem('token', response.data.token);
        navigate('/admin-dashboard'); // Redirect to admin dashboard
      }
    } catch (err) {
      alert('Incorrect password.Or network issue.');
    }    
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4 shadow login-card">
        <h2 className="text-center mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit} className="text-center">
          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-light btn-lg mt-3 border">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
