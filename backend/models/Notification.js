import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  role: { type: String, enum: ['patient', 'dentist', 'admin'], required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  messageTitle: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  email: { type: String, required: true },
});

export default mongoose.model('Notification', notificationSchema);