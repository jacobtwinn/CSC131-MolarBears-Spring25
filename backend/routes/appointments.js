import express from 'express';
import Appointment from '../models/Appointment.js';
import Notification from '../models/Notification.js';
import { authenticateUser } from "../middleware/authenticate.js";
import { sendEmail } from "../utils/mailer.js";

const router = express.Router();

// GET appointments for a specific day
router.get("/", authenticateUser, async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: "Date query parameter is required" });

    const dayStart = new Date(date);
    const dayEnd = new Date(date);
    dayEnd.setDate(dayEnd.getDate() + 1);

    const appointments = await Appointment.find({
      userId: req.user._id,
      date: { $gte: dayStart.toISOString(), $lt: dayEnd.toISOString() },
    });

    res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});
// POST new appointment
router.post("/", authenticateUser, async (req, res) => {
  try {
    const { time, date, reason, provider } = req.body;

    const newAppointment = new Appointment({
      userId: req.user._id,
      name: `${req.user.firstName} ${req.user.lastName}`,
      email: req.user.email,
      time,
      date: new Date(date),
      reason,
      provider,
    });

    const notification = new Notification({
      role: 'patient',
      userId: req.user._id,
      messageTitle: 'New Appointment Scheduled',
      message: `Your appointment with ${provider} for ${reason} has been scheduled for ${time} on ${new Date(date).toDateString()}.`,
      email: req.user.email
    });

    await notification.save();

    await newAppointment.save();

    await sendEmail({
      to: req.user.email,
      subject: "Appointment Confirmation",
      text: `Hi ${req.user.firstName}, your appointment with ${provider} for ${reason} has been booked for ${time} on ${new Date(date).toDateString()}.`,
    });

    res.status(201).json(newAppointment);
  } catch (err) {
    console.error("Error creating appointment:", err);
    res.status(500).json({ error: "Failed to create appointment" });
  }
});

// PUT update appointment
router.put("/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { time, date, reason, provider } = req.body;

    const appointment = await Appointment.findOne({ _id: id, userId: req.user._id });
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });

    appointment.time = time || appointment.time;
    appointment.date = date || appointment.date;
    appointment.reason = reason || appointment.reason;
    appointment.provider = provider || appointment.provider;
    appointment.status = "rescheduled";

    await appointment.save();

    const notification = new Notification({
      role: 'patient',
      userId: req.user._id,
      messageTitle: 'New Appointment Updated',
      message: `Your appointment with ${provider} for ${reason} has been updated for ${time} on ${new Date(date).toDateString()}.`,
      email: req.user.email
    });
    await notification.save();

    await sendEmail({
      to: req.user.email,
      subject: "Appointment Rescheduled",
      text: `Hi ${req.user.firstName}, your appointment has been rescheduled to ${time} on ${new Date(date).toDateString()} with ${provider}.`,
    });

    res.json(appointment);
  } catch (err) {
    console.error("Error updating appointment:", err);
    res.status(500).json({ error: "Failed to update appointment" });
  }
});

// DELETE appointment
router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!appointment) return res.status(404).json({ error: "Appointment not found or unauthorized" });

    await sendEmail({
      to: req.user.email,
      subject: "Appointment Cancelled",
      text: `Hi ${req.user.firstName}, your appointment on ${new Date(appointment.date).toDateString()} at ${appointment.time} has been cancelled.`,
    });

    res.status(204).send();
  } catch (err) {
    console.error("Error deleting appointment:", err);
    res.status(500).json({ error: "Failed to delete appointment" });
  }
});

// GET all appointments for user (calendar highlight)
router.get("/all", authenticateUser, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user._id });
    res.json(appointments);
  } catch (err) {
    console.error("Error fetching all appointments:", err);
    res.status(500).json({ error: "Failed to fetch all appointments" });
  }
});

export default router;
