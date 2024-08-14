const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  complain: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Complaint = mongoose.model('complaints', complaintSchema);

module.exports = Complaint;
