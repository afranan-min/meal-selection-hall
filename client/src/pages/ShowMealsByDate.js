import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import '../styles/ShowMealsByDate.css';

const ShowMealsByDate = () => {
  const [date, setDate] = useState('');
  const [meals, setMeals] = useState([]);
  const [rozameals, setRozameals] = useState([]);
  const [error, setError] = useState('');
  const componentRef = useRef();

  const handleChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isoDate = new Date(date).toISOString(); // Convert to ISO format
    console.log({ isoDate });

    try {
      const [mealsResponse, rozaMealsResponse] = await Promise.all([
        axios.get(`http://localhost:5000/api/meals/meals/${isoDate}`),
        axios.get(`http://localhost:5000/api/meals/roza-meals/${isoDate}`)
      ]);

      // Sort meals by roomNo in ascending order
      const sortedMeals = mealsResponse.data.sort((a, b) => a.roomNo.localeCompare(b.roomNo));
      const sortedRozaMeals = rozaMealsResponse.data.sort((a, b) => a.roomNo.localeCompare(b.roomNo));

      setMeals(sortedMeals);
      setRozameals(sortedRozaMeals);
      setError('');
    } catch (error) {
      console.error('Error fetching meals:', error);
      setMeals([]);
      setRozameals([]);
      setError('Failed to fetch meals for the selected date');
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Meals_${date}`,
  });

  return (
    <div className="container">
      <h2>Select Meals by Date</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label>Select Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-light btn-lg mt-3">
          Show Meals
        </button>
      </form>

      {error && <p className="text-danger mt-3">{error}</p>}

      <div ref={componentRef}>
        {meals.length > 0 && (
          <div className="mt-3">
            <h3>Meals on {date}</h3>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Student Name</th>
                    <th>Room No</th>
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
        )}

        {rozameals.length > 0 && (
          <div className="mt-3">
            <h3>Roza Meals on {date}</h3>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Student Name</th>
                    <th>Room No</th>
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
        )}
      </div>

      <button onClick={handlePrint} className="btn btn-primary mt-3" style={{ border:'none',color:'black',backgroundColor:'rgba(218, 238, 236, 0.49)'}}>
        Print Meals
      </button>
    </div>
  );
};

export default ShowMealsByDate;
