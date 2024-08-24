import Joi from "joi";

const bloodjoi = Joi.object({
    Name: Joi.string().min(2).required(),
    Blood_group: Joi.string().required(),
    Gender: Joi.string().required(),
    Age: Joi.number().required(),
    Email: Joi.string().email().required(),
    Phone_number: Joi.number().min(10).required(),
    District: Joi.string().required(),
    State: Joi.string().required()
});

export default bloodjoi;