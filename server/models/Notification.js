const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  description: { type: String, required: true },
  date: { type: Date, required: true }
  
});

module.exports = mongoose.model('notifications', NotificationSchema);