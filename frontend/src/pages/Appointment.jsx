import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '/src/CSS/Appointment.css';

export default function DentalAppointmentManager() {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [form, setForm] = useState({ name: '', time: '' });

  useEffect(() => {
    fetchAppointments();
  }, [date]);

  const fetchAppointments = async () => {
    const response = await fetch(`/api/appointments?date=${date.toISOString().split('T')[0]}`);
    const data = await response.json();
    setAppointments(data);
  };

  const handleSubmit = async () => {
    const method = selectedAppointment ? 'PUT' : 'POST';
    const endpoint = selectedAppointment ? `/api/appointments/${selectedAppointment._id}` : '/api/appointments';

    await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: date.toISOString(), ...form })
    });

    setForm({ name: '', time: '' });
    setSelectedAppointment(null);
    fetchAppointments();
  };

  const handleDelete = async (id) => {
    await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
    fetchAppointments();
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
        <input
          type="text"
          placeholder="Time (e.g. 10:30 AM)"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          className="input-field"
        />
        <button onClick={handleSubmit} className="submit-button">{selectedAppointment ? 'Update' : 'Add'} Appointment</button>
      </div>
    </div>
  );
}
