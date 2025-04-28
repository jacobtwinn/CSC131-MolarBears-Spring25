import express from 'express';
import Appointment from '../models/Appointment.js';

const router = express.Router();
// GET appointments by date
router.get('/', async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ error: 'Date query parameter is required' });
    }
    const appointments = await Appointment.find({ date: { $regex: `^${date}` } });
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// POST a new appointment
router.post('/', async (req, res) => {
  const { name, time, date } = req.body;
  if (!name || !time || !date) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const newAppointment = new Appointment({ name, time, date });
  await newAppointment.save();
  res.status(201).json(newAppointment);
});

// PUT update an existing appointment
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, time, date } = req.body;
  if (!name || !time || !date) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const updated = await Appointment.findByIdAndUpdate(id, { name, time, date }, { new: true });
  res.json(updated);
});

// DELETE an appointment
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Appointment.findByIdAndDelete(id);
  res.status(204).send();
});

 export default router;
