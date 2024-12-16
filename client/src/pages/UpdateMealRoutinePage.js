import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UpdateMealRoutinePage.css';
const daysOfWeek = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const meals = ["Morning", "Noon", "Dinner"];

const UpdateMealRoutinePage = () => {
  const [routine, setRoutine] = useState({
    Saturday: { Morning: "", Noon: "", Dinner: "" },
    Sunday: { Morning: "", Noon: "", Dinner: "" },
    Monday: { Morning: "", Noon: "", Dinner: "" },
    Tuesday: { Morning: "", Noon: "", Dinner: "" },
    Wednesday: { Morning: "", Noon: "", Dinner: "" },
    Thursday: { Morning: "", Noon: "", Dinner: "" },
    Friday: { Morning: "", Noon: "", Dinner: "" },
  });

  useEffect(() => {
    const fetchRoutine = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/get-routine');
        setRoutine(res.data);
      } catch (error) {
        console.error('Error fetching routine:', error);
      }
    };
    fetchRoutine();
  }, []);

  const handleChange = (day, meal, value) => {
    setRoutine((prevRoutine) => ({
      ...prevRoutine,
      [day]: {
        ...prevRoutine[day],
        [meal]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted'); // Add this line
    try {
      console.log('Before logging routine'); // Add this line
      console.log({ routine }); // This should log the routine object
      await axios.put('http://localhost:5000/api/admin/update-routine', routine);
      alert('Routine updated successfully');
    } catch (error) {
      console.error('Error updating routine:', error);
      alert('Failed to update routine');
    }
  };

  return (
    <div className="container update-meal-routine-page" style={{ border:'none',color:'black',backgroundColor:'rgba(218, 238, 236, 0.49)'}}>
      <h2>Update Meal Routine</h2>
      <form onSubmit={handleSubmit}>
        {daysOfWeek.map((day) => (
          <div key={day} className="day-section">
            <h3>{day}</h3>
            {meals.map((meal) => (
              <div key={meal} className="form-group">
                <label>{meal}</label>
                <input
                  type="text"
                  className="form-control"
                  value={routine[day][meal]}
                  onChange={(e) => handleChange(day, meal, e.target.value)}
                  required
                />
              </div>
            ))}
          </div>
        ))}
        <button type="submit" className="btn btn-primary mt-3" style={{ border:'none',color:'black',backgroundColor:'rgba(10, 68, 32, 0.5)'}}>Update Routine</button>
      </form>
    </div>
  );
};

export default UpdateMealRoutinePage;
