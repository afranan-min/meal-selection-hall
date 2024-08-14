import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ShowMealsPage.css';
const ShowMealsPage = () => {
  const [meals, setMeals] = useState([]);
  const [rozameals, setRozameals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/meals/meals-all`);
        setMeals(response.data);
      } catch (error) {
        alert('Failed to fetch meals');
      }
    };

    const fetchRozameals = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/meals/roza-meals-all`);
        setRozameals(response.data);
      } catch (error) {
        alert('Failed to fetch roza meals');
      }
    };

    fetchMeals();
    fetchRozameals();
  }, []); // Fetch meals on component mount

  return (
    <div className="container">
      <h2>Students Meals</h2>

      <div className="mt-3">
        <h3>All Meals</h3>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>RoomNo</th>
                <th>Breakfast</th>
                <th>Lunch</th>
                <th>Dinner</th>
                <th>Comments</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {meals.map((meal, index) => (
                <tr key={index}>
                  <td>{meal.sid}</td>
                  <td>{meal.studentName}</td>
                  <td>{meal.roomNo}</td>
                  <td>{meal.breakfast}</td>
                  <td>{meal.lunch}</td>
                  <td>{meal.dinner}</td>
                  <td>{meal.comments}</td>
                  <td>{meal.date.substring(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-3">
        <h3>All Meals of Ramadan</h3>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>RoomNo</th>
                <th>Breakfast</th>
                <th>Lunch</th>
                <th>Dinner</th>
                <th>Iftar</th>
                <th>Sehri</th>
                <th>Comments</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {rozameals.map((meal, index) => (
                <tr key={index}>
                  <td>{meal.id}</td>
                  <td>{meal.studentName}</td>
                  <td>{meal.roomNo}</td>
                  <td>{meal.breakfast}</td>
                  <td>{meal.lunch}</td>
                  <td>{meal.dinner}</td>
                  <td>{meal.iftar}</td>
                  <td>{meal.sehri}</td>
                  <td>{meal.comments}</td>
                  <td>{meal.date.substring(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowMealsPage;
