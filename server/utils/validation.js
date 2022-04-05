const Joi = require('@hapi/joi');

//register validation
const registerValidation = data => {
    const schema = Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().required().email(),
        password: Joi.string().min(5).required()
    });
    return schema.validate(data);
};

//login validation
const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(5).required()
    });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;