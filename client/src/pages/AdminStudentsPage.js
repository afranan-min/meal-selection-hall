import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminStudentsPage.css';

const AdminStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPassword, setShowPassword] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/student-info');
        const sortedStudents = response.data.sort((a, b) => a.roomNo.localeCompare(b.roomNo));
        setStudents(sortedStudents);
        setFilteredStudents(sortedStudents);
      } catch (error) {
        setError('Failed to fetch students');
      }
    };

    fetchStudents();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === '') {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(student => student.id.includes(e.target.value));
      setFilteredStudents(filtered);
    }
  };

  const handlePasswordClick = (id) => {
    setShowPassword(showPassword === id ? null : id);
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center admin-students-page">
      <div className="card p-4 shadow-lg w-100" style={{ maxWidth: '900px' }}>
        <h2 className="text-center mb-4">All Students</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Student ID"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Password</th>
                <th>Department</th>
                <th>Level</th>
                <th>Room No</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td onClick={() => handlePasswordClick(student.id)}>
                    {showPassword === student.id ? student.password : '********'}
                  </td>
                  <td>{student.department}</td>
                  <td>{student.level}</td>
                  <td>{student.roomNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStudentsPage;
