import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UpdateMealPricePage.css';

const daysOfWeek = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const meals = ["Morning", "Noon", "Dinner"];

const UpdateMealPricePage = () => {
  const [prices, setPrices] = useState({
    Saturday: { Morning: "", Noon: "", Dinner: "" },
    Sunday: { Morning: "", Noon: "", Dinner: "" },
    Monday: { Morning: "", Noon: "", Dinner: "" },
    Tuesday: { Morning: "", Noon: "", Dinner: "" },
    Wednesday: { Morning: "", Noon: "", Dinner: "" },
    Thursday: { Morning: "", Noon: "", Dinner: "" },
    Friday: { Morning: "", Noon: "", Dinner: "" },
  });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/get-prices');
        setPrices(res.data);
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };
    fetchPrices();
  }, []);

  const handleChange = (day, meal, value) => {
    setPrices((prevPrices) => ({
      ...prevPrices,
      [day]: {
        ...prevPrices[day],
        [meal]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/admin/update-prices', prices);
      alert('Prices updated successfully');
    } catch (error) {
      console.error('Error updating prices:', error);
      alert('Failed to update prices');
    }
  };

  return (
    <div className="container update-meal-price-page">
      <h2>Update Meal Prices</h2>
      <form onSubmit={handleSubmit}>
        {daysOfWeek.map((day) => (
          <div key={day} className="day-section">
            <h3>{day}</h3>
            {meals.map((meal) => (
              <div key={meal} className="form-group">
                <label>{meal}</label>
                <input
                  type="number"
                  className="form-control"
                  value={prices[day][meal]}
                  onChange={(e) => handleChange(day, meal, e.target.value)}
                  required
                />
              </div>
            ))}
          </div>
        ))}
        <button type="submit" className="btn btn-primary mt-3" style={{ border:'none',color:'black',backgroundColor:'rgba(218, 238, 236, 0.49)'}}>Update Prices</button>
      </form>
    </div>
  );
};

export default UpdateMealPricePage;
