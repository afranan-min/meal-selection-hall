import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css'; // Import the CSS file for custom styles

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Navigate back to the admin login page
    navigate('/admin-login');
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
      {/* Logout Button */}
      <div className="logout-container">
        <button onClick={handleLogout} className="btn btn-danger btn-small">Logout</button>
      </div>
      
      <h2 className="welcome-text mb-4">Admin Dashboard</h2>

      {/* Navigation Links */}
      <div className="button-container">
        <Link to="/admin-dashboard/add-student" className="btn btn-light btn-lg">Add New Student</Link>
        <Link to="/admin-dashboard/show-meals" className="btn btn-light btn-lg">Show Meals</Link>
        <Link to="/admin-dashboard/show-meals-by-date" className="btn btn-light btn-lg">Select Meals by Date</Link>
        <Link to="/admin-dashboard/delete-student" className="btn btn-light btn-lg">Delete Student</Link>
        <Link to="/admin-dashboard/meal-routine" className="btn btn-light btn-lg">Meal Routine</Link>
        <Link to="/admin-dashboard/roza-meal-routine" className="btn btn-light btn-lg">Roza Meal Routine</Link>
        <Link to="/admin-dashboard/change-password" className="btn btn-light btn-lg">Change Password</Link>
        <Link to="/admin-dashboard/update-meal-routine" className="btn btn-light btn-lg">Update Meal Routine</Link>
        <Link to="/admin-dashboard/update-roza-meal-routine" className="btn btn-light btn-lg">Update Roza Meal Routine</Link>
        <Link to="/admin-dashboard/notifications" className="btn btn-light btn-lg">Add Notifications</Link>
        <Link to="/admin-dashboard/tea-availability" className="btn btn-light btn-lg">Manage Tea Availability</Link>
        <Link to="/admin-dashboard/show-notifications" className="btn btn-light btn-lg">Notifications</Link>
        <Link to="/admin-dashboard/show-complaint" className="btn btn-light btn-lg">Complaints</Link>
        <Link to="/admin-dashboard/roza-menu" className="btn btn-light btn-lg">Roza Menu</Link>
        <Link to="/admin-dashboard/delete-meal" className="btn btn-light btn-lg">Delete Meal</Link>
        <Link to="/admin-dashboard/show-student-info" className="btn btn-light btn-lg">Show Student Info</Link>
        <Link to="/admin-dashboard/change-room" className="btn btn-light btn-lg">Change Room</Link>
      </div>

      {/* Placeholder content */}
      <p className="small-text text-center mt-2">
        This is the Admin Dashboard. Choose an action above.
      </p>
    </div>
  );
};

export default AdminDashboard;
