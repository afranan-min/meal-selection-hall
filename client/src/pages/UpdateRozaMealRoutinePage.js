import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UpdateRozaMealRoutinePage.css';

const daysOfWeek = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const meals = ["Morning", "Noon", "Dinner", "Iftar", "Sehri"];

const UpdateRozaMealRoutinePage = () => {
  const [routine, setRoutine] = useState({
    Saturday: { Morning: "", Noon: "", Dinner: "", Iftar: "", Sehri: "" },
    Sunday: { Morning: "", Noon: "", Dinner: "", Iftar: "", Sehri: "" },
    Monday: { Morning: "", Noon: "", Dinner: "", Iftar: "", Sehri: "" },
    Tuesday: { Morning: "", Noon: "", Dinner: "", Iftar: "", Sehri: "" },
    Wednesday: { Morning: "", Noon: "", Dinner: "", Iftar: "", Sehri: "" },
    Thursday: { Morning: "", Noon: "", Dinner: "", Iftar: "", Sehri: "" },
    Friday: { Morning: "", Noon: "", Dinner: "", Iftar: "", Sehri: "" },
  });

  useEffect(() => {
    const fetchRoutine = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/roza-get-routine');
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
      await axios.put('http://localhost:5000/api/admin/roza-update-routine', routine);
      alert('Routine updated successfully');
    } catch (error) {
      console.error('Error updating routine:', error);
      alert('Failed to update routine');
    }
  };

  return (
    <div className="container update-roza-meal-routine-page" style={{ border:'none',color:'black',backgroundColor:'rgba(218, 238, 236, 0.49)'}}>
      <h2>Update Meal Routine</h2>
      <form onSubmit={handleSubmit}>
        {daysOfWeek.map((day) => (
          <div key={day} className="day-section">
            <h3>{day}</h3>
            <div className="row">
              {meals.map((meal) => (
                <div key={meal} className="form-group col-12 col-sm-6 col-md-4">
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
          </div>
        ))}
        <button type="submit" className="btn btn-primary mt-3" style={{ border:'none',color:'black',backgroundColor:'rgba(10, 68, 32, 0.5)'}}>Update Routine</button>
      </form>
    </div>
  );
};

export default UpdateRozaMealRoutinePage;
