const mongoose = require('mongoose');

const rozaSchema = new mongoose.Schema({
  isRoza: { type: Boolean, default: false },
});

const Roza = mongoose.model('rozas', rozaSchema);

module.exports = Roza;
