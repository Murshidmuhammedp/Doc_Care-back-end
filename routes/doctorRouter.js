import express from 'express';
import { doctorlogin, doctorRegistration } from '../Controllers/DoctorController/doctorController.js';
import uploadImage from '../Middlewares/uploadImage.js';
import { appointmentApprove, appointmentReject, pendingAppointments, previousAppointment, totalbooking } from '../Controllers/DoctorController/appointments.js';
import { profile } from '../Controllers/DoctorController/profile.js';
import { doctorToken } from '../Middlewares/doctorJwtToken.js';

const router = express.Router();

// Doctor Registration

router.post('/doctor/register', uploadImage, doctorRegistration);

// Doctor Login

router.post('/doctor/login', doctorlogin);

//Pending Appointments
router.get('/doctor/appointments/:doctorId', pendingAppointments);
router.patch('/doctor/appointment/approve/:Id', appointmentApprove);
router.patch('/doctor/appointment/reject/:Id', appointmentReject);
router.get('/doctor/appointment/previous/:Id', previousAppointment);
router.get('/doctor/total/appointments/:doctorId', totalbooking);

// Profile
router.get('/doctor/profile/:Id', profile);


router.get('/protected', doctorToken, (req, res) => {
    res.json({ message: 'This is a Protected Route', user: req.user });
});

export default router;