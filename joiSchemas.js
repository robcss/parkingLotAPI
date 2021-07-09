const Joi = require('joi')

const userSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
}).required()

const slotSchema = Joi.object({
    id: Joi.number().positive().integer().empty('')
}).required()

const parkingSchema = Joi.object({
    licensePlate: Joi.string().required()
}).required()

module.exports = { userSchema, slotSchema, parkingSchema }
