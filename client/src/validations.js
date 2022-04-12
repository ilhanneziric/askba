import Joi from 'joi'

export const userValidation = data => {
    const schema = Joi.object({
        email: Joi.string().required().email({ tlds: { allow: false }}),
        password: Joi.string().min(5).required()
    });
    return schema.validate(data);
};

export const questionValidation = data => {
    const schema = Joi.object({
        title: Joi.string().min(10).required(),
        description: Joi.string().min(10).required()
    });
    return schema.validate(data);
};