import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/PriceRoutinePage.css';

const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const meals = ['Morning', 'Noon', 'Dinner','Iftar', 'Sehri'];

const PriceRoutinePageRoza = () => {
  const [priceRoutine, setPriceRoutine] = useState({});

  useEffect(() => {
    const fetchPriceRoutine = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/get-roza-prices');
        setPriceRoutine(response.data);
      } catch (error) {
        console.error('Error fetching price routine:', error);
      }
    };
    fetchPriceRoutine();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Price Routine</h2>
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
                  <td key={meal}>
                    {priceRoutine[day] ? `${priceRoutine[day][meal]} BDT` : 'N/A'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceRoutinePageRoza;
