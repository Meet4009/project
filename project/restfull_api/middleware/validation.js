
const Joi = require('joi');

const studentRegisterValidate = (req, res, next) => {
    const schema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.number().min(10).required(),
        age: Joi.number().required(),
        gender: Joi.string().required(),
        password: Joi.string().min(4).alphanum().required(),
        confirmpassword: Joi.string().min(4).alphanum().required()
    });
    const { error, value } = schema.validate(req.body);
    if (error) {

        return res.status(400).json({ message: "all fields are required", error });

    }
    next();
}


const studentLoginValidate = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).alphanum().required()
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad Request", error })
    }
    next();
}

module.exports = {
    studentRegisterValidate,
    studentLoginValidate

}  