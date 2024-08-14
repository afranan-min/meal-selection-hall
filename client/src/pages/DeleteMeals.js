import React from 'react';
import axios from 'axios';
import '../styles/DeleteMeals.css';

const DeleteMeals = () => {
  const handleDeleteAll = async () => {
    try {
      const res = await axios.delete('http://localhost:5000/api/admin/delete-all-meals');
      if (res.status === 200) {
        alert('All meals deleted successfully');
      } else {
        alert('Failed to delete all meals');
      }
    } catch (error) {
      console.error('Error deleting all meals:', error);
      alert('Failed to delete all meals');
    }
  };

  const handleDeleteAll2 = async () => {
    try {
      const res = await axios.delete('http://localhost:5000/api/admin/delete-all-meals-roza');
      if (res.status === 200) {
        alert('All meals of Ramadan deleted successfully');
      } else {
        alert('Failed to delete all meals');
      }
    } catch (error) {
      console.error('Error deleting all meals:', error);
      alert('Failed to delete all meals');
    }
  };

  return (
    <div className="container delete-meals-page d-flex flex-column justify-content-center align-items-center">
      <div className="card p-4 shadow-lg w-100" style={{ maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Delete Meals</h2>
        <div className="text-center mt-4">
          <button onClick={handleDeleteAll} className="btn btn-danger btn-lg w-100">Delete All Times Meals Including Today</button>
        </div>
        <div className="text-center mt-4">
          <button onClick={handleDeleteAll2} className="btn btn-danger btn-lg w-100">Delete All Times Meals Of Ramadan Including Today</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMeals;
