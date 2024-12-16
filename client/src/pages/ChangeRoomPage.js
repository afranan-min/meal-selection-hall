import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ChangeRoomPage.css';

const ChangeRoomPage = () => {
  const [studentId, setStudentId] = useState('');
  const [newRoomNo, setNewRoomNo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:5000/api/admin/change-student-room', { studentId, newRoomNo });
      if (res.status === 200) {
        alert('Room number changed successfully');
      }
    } catch (error) {
      alert('Failed to change room number.Maybe student does not exist.Or network issue.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center change-room-page">
      <div className="card p-4 shadow-lg w-100" style={{ maxWidth: '500px' }}>
        <h2 className="text-center mb-4">Change Student Room</h2>
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
            <label>New Room Number</label>
            <input
              type="text"
              className="form-control"
              value={newRoomNo}
              onChange={(e) => setNewRoomNo(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3 w-100" style={{ border:'none',color:'black',backgroundColor:'rgba(218, 238, 236, 0.49)'}}>Change Room Number</button>
        </form>
      </div>
    </div>
  );
};

export default ChangeRoomPage;
