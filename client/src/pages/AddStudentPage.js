import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AddStudentPage.css'; // Import the CSS file

const AddStudentPage = () => {
  const [student, setStudent] = useState({
    id: '',
    name: '',
    password: '',
    department: '',
    level: '',
    roomNo: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/add-student', student);
      alert('Student added successfully');
      navigate('/admin-dashboard');
    } catch (error) {
      alert('Failed to add student.Maybe student Id alredy exist.Or network issue.');
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 p-3">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '600px', width: '100%' }}>
        <h2 className="text-center mb-4">Add New Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="id">Student ID</label>
            <input
              type="text"
              className="form-control"
              id="id"
              name="id"
              value={student.id}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={student.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={student.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              className="form-control"
              id="department"
              name="department"
              value={student.department}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="level">Level</label>
            <input
              type="text"
              className="form-control"
              id="level"
              name="level"
              value={student.level}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="roomNo">Room No</label>
            <input
              type="text"
              className="form-control"
              id="roomNo"
              name="roomNo"
              value={student.roomNo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-light btn-lg mt-3 border">Add Student</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentPage;
