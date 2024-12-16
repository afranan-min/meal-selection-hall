import React, { useState } from 'react';
import axios from 'axios';

const StudentComplaint = () => {
  const [complaint, setComplaint] = useState({
    studentId: localStorage.getItem('studentId') || '',
    name: '',
    complain: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComplaint({ ...complaint, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString();

    const notificationWithDate = {
      ...complaint,
      date: currentDate
    };
    const { name,complain } = notificationWithDate;
    if (!name || !complain) {
      alert('You need to provide name and complain');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/admin/add-complaint',notificationWithDate);
      if (res.status === 201) {
        alert('Complaint submitted successfully');
        setComplaint({ ...complaint, complain: '' });
      } else {
        alert('Failed to submit complaint');
      }
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert('Failed to submit complaint');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Submit a Complaint</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Student ID</label>
          <input
            type="text"
            name="studentId"
            value={complaint.studentId}
            onChange={handleChange}
            className="form-control"
            disabled
          />
        </div>
        <div className="form-group mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={complaint.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group mb-3">
          <label>Complaint</label>
          <textarea
            name="complain"
            value={complaint.complain}
            onChange={handleChange}
            className="form-control"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary" style={{ border:'none',color:'black',backgroundColor:'rgba(218, 238, 236, 0.49)'}}>Submit Complaint</button>
      </form>
    </div>
  );
};

export default StudentComplaint;
