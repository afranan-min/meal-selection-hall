import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UpdateRozaMealPricePage.css';

const daysOfWeek = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const meals = ["Morning", "Noon", "Dinner","Iftar","Sehri"];

const UpdateRozaMealPricePage = () => {
    const [prices, setPrices] = useState({
        Saturday: { Morning: "", Noon: "", Dinner: "", Iftar: "", Sehri: "" },
        Sunday: { Morning: "", Noon: "", Dinner: "", Iftar: "", Sehri: "" },
        Monday: { Morning: "", Noon: "", Dinner: "", Iftar: "", Sehri: "" },
        Tuesday: { Morning: "", Noon: "", Dinner: "", Iftar: "", Sehri: "" },
        Wednesday: { Morning: "", Noon: "", Dinner: "", Iftar: "", Sehri: "" },
        Thursday: { Morning: "", Noon: "", Dinner: "", Iftar: "", Sehri: "" },
        Friday: { Morning: "", Noon: "", Dinner: "", Iftar: "", Sehri: "" },
    });

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/admin/get-roza-prices');
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
            console.log(prices)
            await axios.put('http://localhost:5000/api/admin/update-roza-prices', prices);
            alert('Prices updated successfully');
        } catch (error) {
            console.error('Error updating prices:', error);
            alert('Failed to update prices');
        }
    };

    return (
        <div className="container update-meal-price-page">
            <h2>Update Roza Meal Prices</h2>
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

export default UpdateRozaMealPricePage;
