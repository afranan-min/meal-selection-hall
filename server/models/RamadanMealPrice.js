const mongoose = require('mongoose');

const ramadanPriceSchema = new mongoose.Schema({
  Saturday: {
    Morning: { type: Number, required: true },
    Noon: { type: Number, required: true },
    Dinner: { type: Number, required: true },
    Iftar: { type: Number, required: true }, // Required for Ramazan
    Sehri: { type: Number, required: true }, // Required for Ramazan
  },
  Sunday: {
    Morning: { type: Number, required: true },
    Noon: { type: Number, required: true },
    Dinner: { type: Number, required: true },
    Iftar: { type: Number, required: true }, // Required for Ramazan
    Sehri: { type: Number, required: true }, // Required for Ramazan
  },
  Monday: {
    Morning: { type: Number, required: true },
    Noon: { type: Number, required: true },
    Dinner: { type: Number, required: true },
    Iftar: { type: Number, required: true }, // Required for Ramazan
    Sehri: { type: Number, required: true }, // Required for Ramazan
  },
  Tuesday: {
    Morning: { type: Number, required: true },
    Noon: { type: Number, required: true },
    Dinner: { type: Number, required: true },
    Iftar: { type: Number, required: true }, // Required for Ramazan
    Sehri: { type: Number, required: true }, // Required for Ramazan
  },
  Wednesday: {
    Morning: { type: Number, required: true },
    Noon: { type: Number, required: true },
    Dinner: { type: Number, required: true },
    Iftar: { type: Number, required: true }, // Required for Ramazan
    Sehri: { type: Number, required: true }, // Required for Ramazan
  },
  Thursday: {
    Morning: { type: Number, required: true },
    Noon: { type: Number, required: true },
    Dinner: { type: Number, required: true },
    Iftar: { type: Number, required: true }, // Required for Ramazan
    Sehri: { type: Number, required: true }, // Required for Ramazan
  },
  Friday: {
    Morning: { type: Number, required: true },
    Noon: { type: Number, required: true },
    Dinner: { type: Number, required: true },
    Iftar: { type: Number, required: true }, // Required for Ramazan
    Sehri: { type: Number, required: true }, // Required for Ramazan
  },
});

const RamadanMealPrice = mongoose.model('ramadanmealprices', ramadanPriceSchema);

module.exports = RamadanMealPrice;
