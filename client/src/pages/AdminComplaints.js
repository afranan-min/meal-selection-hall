import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminComplaints.css';

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/get-complaint');
        setComplaints(res.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/delete-complaint/${id}`);
      setComplaints(complaints.filter((complaint) => complaint._id !== id));
      alert('Complaint deleted successfully');
    } catch (error) {
      console.error('Error deleting complaint:', error);
      alert('Failed to delete complaint');
    }
  };

  const handleDeleteAll = async () => {
    try {
      await axios.delete('http://localhost:5000/api/admin/delete-all-complaint');
      setComplaints([]);
      alert('All complaints deleted successfully');
    } catch (error) {
      console.error('Error deleting all complaints:', error);
      alert('Failed to delete all complaints');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Complaints</h2>
      <div className="d-flex justify-content-end mb-4">
        <button className="btn btn-danger" onClick={handleDeleteAll}>
          Delete All Complaints
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Complaint</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint._id}>
                <td>{complaint.studentId}</td>
                <td>{complaint.name}</td>
                <td>{complaint.complain}</td>
                <td>{new Date(complaint.date).toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(complaint._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminComplaints;
