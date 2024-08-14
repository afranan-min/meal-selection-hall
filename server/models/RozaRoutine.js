// src/models/Routine.js
const mongoose = require('mongoose');

const rozaroutineSchema = new mongoose.Schema({
  Saturday: {
    Morning: { type: String, default: 'null' },
    Noon: { type: String, default: 'null' },
    Dinner: { type: String, default: 'null' },
    Iftar: { type: String, default: 'null' },
    Sehri: { type: String, default: 'null' },
  },
  Sunday: {
    Morning: { type: String, default: 'null' },
    Noon: { type: String, default: 'null' },
    Dinner: { type: String, default: 'null' },
    Iftar: { type: String, default: 'null' },
    Sehri: { type: String, default: 'null' },
  },
  // Repeat for other days
  Monday: {
    Morning: { type: String, default: 'null' },
    Noon: { type: String, default: 'null' },
    Dinner: { type: String, default: 'null' },
    Iftar: { type: String, default: 'null' },
    Sehri: { type: String, default: 'null' },
  },
  Tuesday: {
    Morning: { type: String, default: 'null' },
    Noon: { type: String, default: 'null' },
    Dinner: { type: String, default: 'null' },
    Iftar: { type: String, default: 'null' },
    Sehri: { type: String, default: 'null' },
  },
  Wednesday: {
    Morning: { type: String, default: 'null' },
    Noon: { type: String, default: 'null' },
    Dinner: { type: String, default: 'null' },
    Iftar: { type: String, default: 'null' },
    Sehri: { type: String, default: 'null' },
  },
  Thursday: {
    Morning: { type: String, default: 'null' },
    Noon: { type: String, default: 'null' },
    Dinner: { type: String, default: 'null' },
    Iftar: { type: String, default: 'null' },
    Sehri: { type: String, default: 'null' },
  },
  Friday: {
    Morning: { type: String, default: 'null' },
    Noon: { type: String, default: 'null' },
    Dinner: { type: String, default: 'null' },
    Iftar: { type: String, default: 'null' },
    Sehri: { type: String, default: 'null' },
  },
});

const RozaRoutine = mongoose.model('rozaroutines', rozaroutineSchema);

module.exports = RozaRoutine;
