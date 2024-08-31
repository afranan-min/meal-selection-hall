
const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  Saturday: {
    Morning: { type: Number, required: true },
    Noon: { type: Number, required: true },
    Dinner: { type: Number, required: true },
  },
  Sunday: {
    Morning: { type: Number, required: true },
    Noon: { type: Number, required: true },
    Dinner: { type: Number, required: true },
  },
  Monday: {
    Morning: { type: Number, required: true },
    Noon: { type: Number, required: true },
    Dinner: { type: Number, required: true },
  },
  Tuesday: {
    Morning: { type: Number, required: true },
    Noon: { type: Number, required: true },
    Dinner: { type: Number, required: true },
  },
  Wednesday: {
    Morning: { type: Number, required: true },
    Noon: { type: Number, required: true },
    Dinner: { type: Number, required: true },
  },
  Thursday: {
    Morning: { type: Number, required: true },
    Noon: { type: Number, required: true },
    Dinner: { type: Number, required: true },
  },
  Friday: {
    Morning: { type: Number, required: true },
    Noon: { type: Number, required: true },
    Dinner: { type: Number, required: true },
  },
});

const MealPrice = mongoose.model('mealprices', priceSchema);

module.exports = MealPrice;
