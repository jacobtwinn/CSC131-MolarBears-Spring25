import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true, // e.g., '2025-04-23'
  },
}, { timestamps: true });

export default mongoose.model('Appointment', AppointmentSchema);