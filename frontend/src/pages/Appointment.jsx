import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-calendar/dist/Calendar.css';
import { format, parse} from 'date-fns';
import '/src/CSS/Appointment.css';
import { time } from 'framer-motion';

export default function DentalAppointmentManager() {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [form, setForm] = useState({ name: '', time: '' });

  const formattedDate = date.toISOString().split('T')[0];
  console.log('Formatted Date:', formattedDate);

  useEffect(() => {
    fetchAppointments();
  }, [formattedDate]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/appointments?date=${formattedDate}`);
      const text = await response.text();
      const data = JSON.parse(text);
      setAppointments(data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    }
  };
  
  const handleSubmit = async () => {
    const day = date.getDay();
    if (day === 0 || day === 6) {
      alert('Appointments cannot be scheduled on weekends. Please select a weekday.');
      return;
    }
    if (!form.name || !form.time) {
      alert('Please fill in all fields.');
      return;
    }
    const formattedTime = form.time ? format(parse(form.time, 'HH:mm', new Date()), 'hh:mm a') : '';
    const method = selectedAppointment ? 'PUT' : 'POST';
    const endpoint = selectedAppointment
      ? `http://localhost:5001/api/appointments/${selectedAppointment._id}`
      : 'http://localhost:5001/api/appointments';

    console.log('Submitting to:', endpoint);
    console.log('Payload:', { date: formattedDate, ...form });
    
    try {
      await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: formattedDate, name: form.name, time: formattedTime })
      });
      setForm({ name: '', time: '' });
      setSelectedAppointment(null);
      fetchAppointments();
    } catch (err) {
      console.error('Error handling appointment:', err);
    }
    alert(`Appointment ${selectedAppointment ? 'updated' : 'added'} successfully!`);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5001/api/appointments/${id}`, { method: 'DELETE' });
      fetchAppointments();
    } catch (err) {
      console.error('Error deleting appointment:', err);
    }
  };

  const openEdit = (appt) => {
    setForm({ name: appt.name, time: appt.time });
    setSelectedAppointment(appt);
  };

  return (
    <div className="appointment-container">
      <h1 className="appointment-header">Dental Cleaning Appointments</h1>
      <Calendar onChange={setDate} value={date} />

      <div className="appointment-list">
        <h2 className="appointment-subheader">Appointments for {date.toDateString()}</h2>
        {appointments.map((appt) => (
          <div key={appt._id} className="appointment-item">
            <div>
              <p className="appointment-name">{appt.name}</p>
              <p className="appointment-time">{appt.time}</p>
            </div>
            <div>
              <button onClick={() => openEdit(appt)} className="edit-button">Edit</button>
              <button onClick={() => handleDelete(appt._id)} className="delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="appointment-form">
        <h2 className="appointment-subheader">{selectedAppointment ? 'Edit' : 'New'} Appointment</h2>
        <input
          type="text"
          placeholder="Patient Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="input-field"
        />
          <TimePicker
            onChange={(time) => setForm({ ...form, time })}
            value={form.time}
            disableClock={true}
            format="hh:mm a"
            clearIcon={null}
            className="input-field"
            required={true}
          />
        <button onClick={handleSubmit} className="submit-button">{selectedAppointment ? 'Update' : 'Add'} Appointment</button>
      </div>
    </div>
  );
}
