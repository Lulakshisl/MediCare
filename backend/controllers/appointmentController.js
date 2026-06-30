import Appointment from '../models/Appointment.js';

export const bookAppointment = async (req, res) => {
  try {
    const appt = await Appointment.create({ ...req.body, patient: req.user._id });
    res.status(201).json(appt);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const getMyAppointments = async (req, res) => {
  try {
    const filter = req.user.role === 'patient'
      ? { patient: req.user._id } : { doctor: req.user._id };
    const appts = await Appointment.find(filter)
      .populate('patient', 'name email')
      .populate('doctor', 'name')
      .sort({ date: 1 });
    res.json(appts);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const updateStatus = async (req, res) => {
  try {
    const appt = await Appointment.findByIdAndUpdate(
      req.params.id, { status: req.body.status }, { new: true }
    );
    res.json(appt);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
