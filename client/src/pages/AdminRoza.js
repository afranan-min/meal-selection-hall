import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminRoza.css';

const AdminRoza = () => {
  const [isRoza, setIsRoza] = useState(false);

  useEffect(() => {
    const fetchRozaStatus = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/get-rozastatus');
        setIsRoza(res.data.isRoza);
      } catch (error) {
        console.error('Error fetching Roza status:', error);
      }
    };

    fetchRozaStatus();
  }, []);

  const handleToggleRoza = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/admin/add-rozastatus', { isRoza: !isRoza });
      if (res.status === 200) {
        setIsRoza(res.data.isRoza);
        alert('Roza status updated successfully');
      } else {
        alert('Failed to update Roza status');
      }
    } catch (error) {
      console.error('Error updating Roza status:', error);
      alert('Failed to update Roza status');
    }
  };

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <h2 className="text-center mb-4">Manage Roza Status</h2>
      <div className="form-group text-center">
        <label className="status-label">{isRoza ? "It is Ramadan month" : "It is not Ramadan month"}</label>
      </div>
      <button className="btn btn-primary mt-3" style={{ border:'none',color:'black',backgroundColor:'rgba(218, 238, 236, 0.49)'}} onClick={handleToggleRoza}>
        {isRoza ? "Change to Not Ramadan month" : "Change to Ramadan month"}
      </button>
    </div>
  );
};

export default AdminRoza;
