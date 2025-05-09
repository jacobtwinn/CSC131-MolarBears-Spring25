const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: Date, required: true },
  position: { type: String, required: true },
  salary: { type: Number, required: true },
});

module.exports = mongoose.model('Employee', EmployeeSchema);