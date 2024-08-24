import express from 'express';
import uploadImage from '../Middlewares/uploadImage.js';
import { hospitalRegistration } from '../Controllers/HospitalController/hospitalController.js';

const router = express.Router();

// Hospital Registration

router.post('/hospital/register', uploadImage, hospitalRegistration);

export default router;