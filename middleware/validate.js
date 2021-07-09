const ExpressError = require("../ExpressError")
const { userSchema, slotSchema, parkingSchema } = require("../joiSchemas")

const getValidationFunction = schema => {
    return (req, res, next) => {

        const { error } = schema.validate(req.body);
        if (error) {
            const msg = error.details.map(el => el.message).join(',')
            throw new ExpressError(msg, 400)
        } else {
            next();
        }
    }
}

module.exports.user = getValidationFunction(userSchema)


module.exports.slot = getValidationFunction(slotSchema)


module.exports.parking = getValidationFunction(parkingSchema)

