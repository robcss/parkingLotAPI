require('dotenv').config()

const jwt = require("jsonwebtoken")
const tokenSecret = process.env.TOKEN_SECRET || "test"

const ExpressError = require("../utils/ExpressError")

module.exports = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) throw new ExpressError("No auth token provided!", 403)

    let decoded;

    try {
        decoded = jwt.verify(token, tokenSecret)
    } catch (error) {
        throw new ExpressError("Auth token is invalid!", 403)
    }

    req.user = decoded

    next()
}
