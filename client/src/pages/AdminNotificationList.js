import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminNotificationList.css';

const AdminNotificationList = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/notifications');
      setNotifications(res.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/admin/delete-notifications/${id}`);
      if (res.status === 200) {
        setNotifications(notifications.filter(notification => notification._id !== id));
        alert('Notification deleted successfully');
      } else {
        alert('Failed to delete notification');
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
      alert('Failed to delete notification');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">All Notifications</h2>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map(notification => (
              <tr key={notification._id}>
                <td>{notification.description}</td>
                <td>{new Date(notification.date).toLocaleString()}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(notification._id)}>
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

export default AdminNotificationList;
