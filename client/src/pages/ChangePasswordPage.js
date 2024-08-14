import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ChangePasswordPage.css';

const ChangePasswordPage = () => {
  const [studentId, setStudentId] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:5000/api/admin/change-student-password', { studentId, newPassword });
      if (res.status === 200) {
        alert('Password changed successfully');
      }
    } catch (error) {
      alert('Failed to change password.Maybe student does not exist.Or network issue.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center change-password-page">
      <div className="card p-4 shadow-lg w-100" style={{ maxWidth: '500px' }}>
        <h2 className="text-center mb-4">Change Student Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Student ID</label>
            <input
              type="text"
              className="form-control"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3 w-100">Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
