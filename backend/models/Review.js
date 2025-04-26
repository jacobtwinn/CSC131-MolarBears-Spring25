const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  reviewer: { type: String, required: true },
  dentist: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String, required: true },
});

module.exports = mongoose.model('Review', ReviewSchema);