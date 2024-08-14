// src/models/TeaAvailability.js
const mongoose = require('mongoose');

const teaAvailabilitySchema = new mongoose.Schema({
  available: { type: Boolean, default: false },
});

const TeaAvailability = mongoose.model('tea_availabilities', teaAvailabilitySchema);

module.exports = TeaAvailability;
