const mongoose = require('mongoose');

const rozamealSchema = new mongoose.Schema({
  id: { type: String, required: true },
  date: { type: Date, default: Date.now },
  day: { type: String, required: true },
  breakfast: { type: String, required: true },
  breakfastPrice: { type: Number, required: true },
  lunch: { type: String, required: true },
  lunchPrice: { type: Number, required: true },
  dinner: { type: String, required: true },
  dinnerPrice: { type: Number, required: true },
  iftar: { type: String, required: true },
  iftarPrice: { type: Number, required: true },
  sehri: { type: String, required: true },
  sehriPrice: { type: Number, required: true },
  comments: { type: String },
  studentName: { type: String,required: true },  // Add the student name field
  roomNo: { type: String,required: true }        // Add the room number field
});

const RozaMeal = mongoose.model('rozameals', rozamealSchema);

module.exports = RozaMeal;
