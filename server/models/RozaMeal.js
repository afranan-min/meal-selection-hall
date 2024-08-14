const mongoose = require('mongoose');

const rozamealSchema = new mongoose.Schema({
  id: { type: String, required: true },
  date: { type: Date, default: Date.now },
  breakfast: { type: String, required: true },
  lunch: { type: String, required: true },
  dinner: { type: String, required: true },
  iftar: { type: String, required: true },
  sehri: { type: String, required: true },
  comments: { type: String },
  studentName: { type: String,required: true },  // Add the student name field
  roomNo: { type: String,required: true }        // Add the room number field
});

const RozaMeal = mongoose.model('rozameals', rozamealSchema);

module.exports = RozaMeal;
