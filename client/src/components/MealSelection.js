import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MealRoutinePage from '../pages/MealRoutinePage';
import '../styles/MealSelection.css'; // Import the CSS file for custom styles

const MealSelection = () => {
  const [mealSelection, setMealSelection] = useState({
    sid: localStorage.getItem('studentId') || '',
    breakfast: '',
    lunch: '',
    dinner: '',
    comments: '',
    date: new Date().toISOString(),
  });

  const [isTeaAvailable, setIsTeaAvailable] = useState(false);
  const [showRoutinePopup, setShowRoutinePopup] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMealSelection({ ...mealSelection, [name]: value });
  };

  useEffect(() => {
    const fetchTeaAvailability = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/get-tea-availability');
        setIsTeaAvailable(res.data.available);
      } catch (error) {
        console.error('Error fetching tea availability:', error);
      }
    };

    const fetchNotifications = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/notifications');
        setNotifications(res.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    const fetch = async () => {
      const rozaRes = await axios.get('http://localhost:5000/api/admin/get-rozastatus');
      if (rozaRes.data.isRoza) {
        navigate('/roza-meal-selection');
      }
    };

    fetchTeaAvailability();
    fetchNotifications();
    fetch();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('studentId');
    localStorage.removeItem('token');
    navigate('/student-login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { breakfast, lunch, dinner} = mealSelection;
    if (!breakfast || !lunch || !dinner) {
      alert('Please select yes or no for all these three (breakfast,lunch,dinner).');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/meals/save', mealSelection);

      if (res.status === 201) {
        alert('Meal selection saved successfully');
        window.location.reload();
      } else {
        alert('Failed to save meal selection');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save meal selection');
    }
  };

  const toggleRoutinePopup = () => {
    setShowRoutinePopup(!showRoutinePopup);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggle = () => {
    navigate('/student-login/add-complaint');
  };

  return (
    <div className="container-fluid d-flex flex-column align-items-center min-vh-100 p-3">
      <div className="top-left-buttons">
        <div className={`menu ${menuOpen ? 'open' : ''}`}>
          <button style={{ color: 'red' }} onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
          <button onClick={toggleRoutinePopup} className="btn btn-secondary">
            View Meal Routine
          </button>
          <button onClick={toggleNotifications} className="btn btn-secondary">
            View Notifications
          </button>
          <button onClick={toggle} className="btn btn-secondary">
            Add Complaint
          </button>
        </div>
        <div className="tea-availability-btn">
          {isTeaAvailable ? (
            <p className="text-success">Tea is available!</p>
          ) : (
            <p className="text-danger">Tea is not available.</p>
          )}
        </div>
      </div>

      {!showRoutinePopup && !showNotifications && (
        <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '500px', marginTop:'240px'}}>
          <h2 className="text-center mb-4">Select Your Meals for Tomorrow</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label>Breakfast</label>
              <div>
                <input
                  type="radio"
                  name="breakfast"
                  value="yes"
                  onChange={handleChange}
                  className="me-2"
                />{' '}
                Yes
                <input
                  type="radio"
                  name="breakfast"
                  value="no"
                  onChange={handleChange}
                  className="ms-3 me-2"
                />{' '}
                No
              </div>
            </div>
            <div className="form-group mb-3">
              <label>Lunch</label>
              <div>
                <input
                  type="radio"
                  name="lunch"
                  value="yes"
                  onChange={handleChange}
                  className="me-2"
                />{' '}
                Yes
                <input
                  type="radio"
                  name="lunch"
                  value="no"
                  onChange={handleChange}
                  className="ms-3 me-2"
                />{' '}
                No
              </div>
            </div>
            <div className="form-group mb-3">
              <label>Dinner</label>
              <div>
                <input
                  type="radio"
                  name="dinner"
                  value="yes"
                  onChange={handleChange}
                  className="me-2"
                />{' '}
                Yes
                <input
                  type="radio"
                  name="dinner"
                  value="no"
                  onChange={handleChange}
                  className="ms-3 me-2"
                />{' '}
                No
              </div>
            </div>
            <div className="form-group mb-4">
              <label>Comments</label>
              <textarea
                name="comments"
                onChange={handleChange}
                className="form-control"
              ></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-light btn-lg">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      {showRoutinePopup && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-btn" onClick={toggleRoutinePopup}>
              Close
            </button>
            <MealRoutinePage />
          </div>
        </div>
      )}
      {showNotifications && (
        <div className="notifications">
          <div className="notifications-content">
            <button className="close-btn" onClick={toggleNotifications} style={{ color: 'white' }}>
              Close
            </button>
            <h2 className="text-center">Notifications</h2>
            <ul className="list-group">
              {notifications.map((notification) => (
                <li key={notification._id} className="list-group-item">
                  <strong>Date:</strong> {new Date(notification.date).toLocaleDateString()} <br />
                  <strong>Description:</strong> {notification.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealSelection;
