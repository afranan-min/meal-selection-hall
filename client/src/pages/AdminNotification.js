import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AdminNotification.css';

const AdminNotification = () => {
  const [newNotification, setNewNotification] = useState({
    description: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNotification({ ...newNotification, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set the current date and time
    const currentDate = new Date().toISOString();

    const notificationWithDate = {
      ...newNotification,
      date: currentDate
    };

    try {
      const res = await axios.post('http://localhost:5000/api/admin/add-notifications', notificationWithDate);
      if (res.status === 201) {
        alert('Notification added successfully');
        setNewNotification({ description: '', date: '' });
      } else {
        alert('Failed to add notification');
      }
    } catch (error) {
      console.error('Error adding notification:', error);
      alert('Failed to add notification');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Add Notification</h2>
      <form onSubmit={handleSubmit} className="text-center">
        <div className="form-group mb-3">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={newNotification.description}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter notification description"
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary btn-lg" style={{ border:'none',color:'black',backgroundColor:'rgba(218, 238, 236, 0.49)'}}>Add Notification</button>
      </form>
    </div>
  );
};

export default AdminNotification;
