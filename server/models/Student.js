const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  department: { type: String, required: true },
  level: { type: String, required: true },
  roomNo: { type: String, required: true },
  role: { type: String, default: 'student' }
});

module.exports = mongoose.model('students', studentSchema);
