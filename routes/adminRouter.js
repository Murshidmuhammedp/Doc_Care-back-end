import express from 'express';
import { adminLogin } from '../Controllers/AdminController/adminController.js';
import { BlockandUnblock, ViewallUser } from '../Controllers/AdminController/adminUserController.js';
import { approvedoctor, dashboardDoctors, pendingrequestdoctor, rejectDoctor, viewDoctors } from '../Controllers/AdminController/adminDoctorController.js';
import { approveHospital, dashboardHospital, pendingrequesthospital, rejectHospital } from '../Controllers/AdminController/adminHospitalController.js';
import { dashboardblood } from '../Controllers/AdminController/blooddonorController.js';
const router = express.Router();

// Admin Login

router.post('/login', adminLogin);

// User Controller

router.get('/userdata', ViewallUser);
router.patch('/blockandunblock/:id', BlockandUnblock);

// Doctor Controller

router.get('/workers/doctor/pendingrequest', pendingrequestdoctor);
router.delete('/workers/doctor/rejected/:id', rejectDoctor);
router.patch('/workers/doctor/approved/:id', approvedoctor);
router.get('/doctors/view/data',viewDoctors);
router.get('/doctors/data/dashboard',dashboardDoctors);

// Hospital Controller

router.get('/workers/hospital/pendingrequest', pendingrequesthospital);
router.delete('/workers/hospital/rejected/:id', rejectHospital);
router.patch('/workers/hospital/approved/:id', approveHospital);
router.get('/hospital/data/dashboard',dashboardHospital);

//  Blood Donors Controller

router.get('/blood/donors',dashboardblood);

export default router;
