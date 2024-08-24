import Joi from 'joi';

const hospitaljoi = Joi.object({
    License_number: Joi.string().required(),
    Hospital_name: Joi.string().required(),
    Email: Joi.string().email().required(),
    Phone_Number: Joi.number().required(),
    Address: Joi.string().required(),
    City: Joi.string().required(),
    District: Joi.string().required(),
    State: Joi.string().required(),
    Pincode: Joi.number().required(),
    Password: Joi.string().required()
});

export default hospitaljoi;