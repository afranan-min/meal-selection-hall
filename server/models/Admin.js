const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
  password: { type: String},
  role: { type: String, default: 'admin' }
});
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
