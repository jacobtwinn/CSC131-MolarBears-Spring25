import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: Date, // Store as actual Date object
    required: true,
  },
  status: {
    type: String,
    enum: ["booked", "cancelled", "rescheduled"],
    default: "booked",
  },
  reason: {
    type: String,
    default: "General appointment",
  },
  provider: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.model('Appointment', AppointmentSchema);
