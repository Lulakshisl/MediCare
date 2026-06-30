import express from 'express';
import { bookAppointment, getMyAppointments, updateStatus } from '../controllers/appointmentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();
router.post('/', protect, authorize('patient'), bookAppointment);
router.get('/mine', protect, authorize('patient','doctor'), getMyAppointments);
router.put('/:id/status', protect, authorize('doctor','admin'), updateStatus);

export default router;
