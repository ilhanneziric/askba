const Joi = require('@hapi/joi');

const validation = data => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(5).required()
    });
    return schema.validate(data);
};

module.exports = validation;