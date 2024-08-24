import Joi from 'joi';

const doctorjoi = Joi.object({
    doctor_ID: Joi.string().required(),
    full_Name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone_Number: Joi.number().required(),
    gender: Joi.string().required(),
    DOB: Joi.string().required(),
    specialization: Joi.string().required(),
    experience: Joi.number().required(),
    consultation_Fee: Joi.number().required(),
    consultation_Address: Joi.string().required(),
    district: Joi.string().required(),
    state: Joi.string().required(),
    pincode: Joi.number().required(),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
    password: Joi.string().required()
});

export default doctorjoi;