import React, { useState } from 'react';
import axios from 'axios';
import '../styles/DeleteStudentByIdForm.css';

const DeleteStudentByIdForm = () => {
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setId(e.target.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:5000/api/admin/students/delete/${id}`);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to delete student.Maybe student is not registered or deleted.Or network issue.');
    }
  };

  return (
    <div className="container delete-student-page d-flex flex-column justify-content-center align-items-center">
      <div className="card p-4 shadow-lg w-100" style={{ maxWidth: '500px' }}>
        <h2 className="text-center mb-4">Delete Student by ID</h2>
        <form onSubmit={handleDelete}>
          <div className="form-group mb-3">
            <label>Student ID</label>
            <input
              type="text"
              className="form-control"
              value={id}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-danger btn-lg w-100">
            Delete Student
          </button>
        </form>
        {message && <p className="text-danger mt-3 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default DeleteStudentByIdForm;
