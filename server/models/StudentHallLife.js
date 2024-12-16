const mongoose = require('mongoose');

const studentHallLifeSchema = new mongoose.Schema({
  sid: { type: String, required: true },
  description: { type: String, required: true },
  driveLink: { type: String},
  createdAt: { type: Date, default: Date.now },
});

const StudentHallLife = mongoose.model('studenthallLifes', studentHallLifeSchema);

module.exports = StudentHallLife;
