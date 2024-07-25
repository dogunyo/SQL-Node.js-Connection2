const joi = require("joi");
    const authSchema = joi.object({
        userName: joi.string().required(),
        email: joi.string().email().lowercase().required(),
        password: joi.string().min(6).required()
    });

module.exports = {
    authSchema
}