const Joi = require('@hapi/joi');

//Login validation
const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(6).
            required(),
        password: Joi.string()
            .min(6).
            required()
    })
    return schema.validate(data)
}

//Register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    })
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

