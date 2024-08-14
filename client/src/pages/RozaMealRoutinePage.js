import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/RozaMealRoutinePage.css';
const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const meals = ['Morning', 'Noon', 'Dinner','Iftar','Sehri'];

const RozaMealRoutinePage = () => {
  const [routine, setRoutine] = useState([]);

  useEffect(() => {
    const fetchRoutine = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/roza-get-routine');
        setRoutine(response.data);
      } catch (error) {
        console.error('Error fetching routine:', error);
      }
    };
    fetchRoutine();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Meal Routine</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Day</th>
              {meals.map(meal => <th key={meal}>{meal}</th>)}
            </tr>
          </thead>
          <tbody>
            {days.map(day => (
              <tr key={day}>
                <td>{day}</td>
                {meals.map(meal => (
                  <td key={meal}>{routine[day] ? routine[day][meal] : 'null'}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RozaMealRoutinePage;
