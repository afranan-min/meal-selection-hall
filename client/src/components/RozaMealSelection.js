import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RozaMealRoutinePage from '../pages/RozaMealRoutinePage';
import '../styles/RozaMealSelection.css';

const RozaMealSelection = () => {
  const [mealSelection, setMealSelection] = useState({
    sid: localStorage.getItem('studentId') || '',
    breakfast: '',
    lunch: '',
    dinner: '',
    iftar: '',
    sehri: '',
    comments: '',
    date: new Date().toISOString(),
  });

  const [isTeaAvailable, setIsTeaAvailable] = useState(false);
  const [showRoutinePopup, setShowRoutinePopup] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

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
        // Roza status is active, no need to navigate away
      } else {
        navigate('/meal-selection');
      }
    };
    fetch();
    fetchTeaAvailability();
    fetchNotifications();
  }, [navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { breakfast, lunch, dinner,iftar,sehri} = mealSelection;
    if (!breakfast || !lunch || !dinner|| !iftar || !sehri) {
      alert('Please select yes or no for all these five (breakfast,lunch,dinner,iftar,sehri).');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/meals/roza-save', mealSelection);

      if (res.status === 201) {
        alert('Roza meal selection saved successfully');
        window.location.reload();
      } else {
        alert('Failed to save meal ');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save meal selection');
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('studentId');
    localStorage.removeItem('token');
    navigate('/student-login');
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
    <div className="container-fluid d-flex flex-column align-items-center" style={{ minHeight: '100vh', padding: '20px' }}>
      <div className="d-flex justify-content-center flex-wrap gap-2 mb-3">
        <button
          style={{ color: 'white', fontSize: '18px' }}
          onClick={toggleRoutinePopup}
          className="btn btn-secondary"
        >
          View Meal Routine
        </button>
        <button
          style={{ color: 'white', fontSize: '18px' }}
          onClick={toggleNotifications}
          className="btn btn-secondary"
        >
          View Notifications
        </button>
        <button
          style={{ color: 'white', fontSize: '18px' }}
          onClick={toggle}
          className="btn btn-secondary"
        >
          Add Complaint
        </button>
        <button
          style={{ color: 'red', fontSize: '18px' }}
          onClick={handleLogout}
          className="btn btn-secondary"
        >
          Logout
        </button>
      </div>
      <div className="alert" style={{ width: '100%', maxWidth: '500px', backgroundColor: 'white', borderRadius: '5px', padding: '10px', textAlign: 'center' }}>
        {isTeaAvailable ? (
          <p className="text-success">Tea is available!</p>
        ) : (
          <p className="text-danger">Tea is not available.</p>
        )}
      </div>
      {!showRoutinePopup && !showNotifications && (
        <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '500px' }}>
          <h2 className="text-center mb-4">Select Your Meals for Tomorrow</h2>
          <form onSubmit={handleSubmit} className="text-center">
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
            <div className="form-group mb-3">
              <label>Iftar</label>
              <div>
                <input
                  type="radio"
                  name="iftar"
                  value="yes"
                  onChange={handleChange}
                  className="me-2"
                />{' '}
                Yes
                <input
                  type="radio"
                  name="iftar"
                  value="no"
                  onChange={handleChange}
                  className="ms-3 me-2"
                />{' '}
                No
              </div>
            </div>
            <div className="form-group mb-3">
              <label>Sehri</label>
              <div>
                <input
                  type="radio"
                  name="sehri"
                  value="yes"
                  onChange={handleChange}
                  className="me-2"
                />{' '}
                Yes
                <input
                  type="radio"
                  name="sehri"
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
            <RozaMealRoutinePage />
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

export default RozaMealSelection;
