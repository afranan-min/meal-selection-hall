const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  sid: { type: String, required: true },
  date: { type: Date, default: Date.now }, // Add a date field with default value
  breakfast: { type: String, required: true },
  lunch: { type: String, required: true },
  dinner: { type: String, required: true },
  comments: { type: String },
  studentName: { type: String ,required: true},  // Add the student name field
  roomNo: { type: String ,required: true} 
});

const Meal = mongoose.model('Meeal', mealSchema);

module.exports = Meal;
