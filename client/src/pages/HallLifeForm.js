import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HallLifeForm = () => {
  const [studentId, setStudentId] = useState('');
  const [description, setDescription] = useState('');
  const [driveLink, setDriveLink] = useState('');
  const [message, setMessage] = useState('');

  // Automatically get studentId from localStorage on component mount
  useEffect(() => {
    const sid = localStorage.getItem('studentId') || '';
    setStudentId(sid);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      sid: studentId,
      description,
      driveLink,
    };

    try {
      // Send data to the backend
      const response = await axios.post('http://localhost:5000/api/admin/add-student-hall-life', data);

      if (response.status === 200) {
        setMessage('Hall life shared successfully!');
        setDescription('');
        setDriveLink('');
      }
      else if (response.status === 400) {
        setMessage('Hall life could not be shared successfully!Contains negative comments');
        setDescription('');
        setDriveLink('');
      }

    } catch (error) {
      console.error('Error submitting hall life:', error);
      setMessage('Failed to share hall life. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="text-center">Share Your Hall Life Experience</h2>
          {message && <div className="alert alert-info">{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="driveLink" className="form-label">Google Drive Link (Optional)</label>
              <input
                type="url"
                className="form-control"
                id="driveLink"
                placeholder="https://drive.google.com/..."
                value={driveLink}
                onChange={(e) => setDriveLink(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Share</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HallLifeForm;
