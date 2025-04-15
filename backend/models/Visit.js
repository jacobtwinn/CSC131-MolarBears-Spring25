const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  patient: { type: String, required: true },
  dentist: { type: String, required: true },
  service: { type: String, required: true },
});

module.exports = mongoose.model('Visit', VisitSchema);