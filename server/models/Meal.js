const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  sid: { type: String, required: true },
  date: { type: Date, default: Date.now },
  day: { type: String, required: true }, // Store the day of the week
  breakfast: { type: String, required: true },
  breakfastPrice: { type: Number, required: true },
  lunch: { type: String, required: true },
  lunchPrice: { type: Number, required: true },
  dinner: { type: String, required: true },
  dinnerPrice: { type: Number, required: true },
  comments: { type: String },
  studentName: { type: String, required: true },
  roomNo: { type: String, required: true }
});

const Meal = mongoose.model('meeals', mealSchema);

module.exports = Meal;
