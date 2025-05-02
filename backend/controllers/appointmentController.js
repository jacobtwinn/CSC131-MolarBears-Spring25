import Appointment from '../models/Appointment.js';

export const createAppointment = async (requestAnimationFrame, res) =>
{
    try
    {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status.save(201).json(appointment);
    }
    catch (error)
    {
        req.status(400).json({ error: error.message});
    }
};

export const getAppointments = async (req, res) =>
{
    try
    {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    }
    catch (error)
    {
        req.status(400).json({ error: error.message});
    }
}

export const updateAppointment = async (req, res) =>
    {
        try
        {
            const appointment = await Appointment.findByIdAndUpdate(req.params.id, { new: true });
            res.status(200).json(appointment);
        }
        catch (error)
        {
            req.status(400).json({ error: error.message});
        }
    }

    export const getAppointment = async (req, res) =>
{
    try
    {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    }
    catch (error)
    {
        req.status(400).json({ error: error.message});
    }
}

export const deleteAppointment = async (req, res) =>
    {
        try
        {
            await Appointment.findByIdAndDelete(req.params.id);
            res.status(204).end();
        }
        catch (error)
        {
            req.status(400).json({ error: error.message});
        }
    }