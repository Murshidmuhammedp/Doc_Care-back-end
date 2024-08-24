import express from 'express';
import { signin, signup } from '../Controllers/UserController/userController.js'
import { bloodRegister } from '../Controllers/UserController/bloodRegisterController.js'
import { filterData } from '../Controllers/UserController/filterData.js';
import { bookedTimeSlot, bookingAppointment, previousBooking } from '../Controllers/UserController/booking.js';
import { userProfile } from '../Controllers/UserController/userProfile.js';

const router = express.Router();

router.post('/register', signup);
router.post('/login', signin);

// Blood Register

router.post('/bloodregister', bloodRegister);

// Doctor Find

router.get('/finddoctors', filterData);

// Booking Doctor

router.post('/doctor/:doctorId/appointment/booking/:userId', bookingAppointment);

// Profile
router.get('/user/profile/:Id', userProfile);

// Booked TimeSlot
router.get('/doctor/:Id/bookings', bookedTimeSlot);

// Previous Booking
router.get('/previous/booking/:Id', previousBooking)

export default router;