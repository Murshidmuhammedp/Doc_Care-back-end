import Joi from 'joi';

const userjoi = Joi.object({
    username: Joi.string().min(2).max(30).required(),
    phone_number: Joi.number().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
export default userjoi;