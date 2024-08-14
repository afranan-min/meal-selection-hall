import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', { studentId, password });
      // Redirect to student dashboard
      const { token } = res.data;
      
      localStorage.setItem('studentId', studentId);
      localStorage.setItem('token', token);
      console.log(localStorage.getItem('token'));
      alert('Login successful');
      const rozaRes = await axios.get('http://localhost:5000/api/admin/get-rozastatus');
      if (rozaRes.data.isRoza) {
        navigate('/roza-meal-selection');
      } else {
        navigate('/meal-selection');
      }
    } catch (error) {
      alert('Login failed.Invalid id or password.Or maybe you need to register.');
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="col-md-4">
          <div className="card p-4">
            <h2 className="text-center mb-4">Student Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Student ID</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-light btn-lg mt-3">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
