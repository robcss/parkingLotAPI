require('dotenv').config()

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")
const tokenSecret = process.env.TOKEN_SECRET || "dropTest"

const ExpressError = require("../ExpressError")

const users = [] // in-memory users store

module.exports.signup = async (req, res) => {
    const { email, password } = req.body

    const hash = await bcrypt.hash(password, 10)

    users.push({ email, password: hash })

    const token = jwt.sign({ email }, tokenSecret, { expiresIn: '24h' })

    res.json({ token })

}

module.exports.login = async (req, res) => {
    const { email, password } = req.body

    const user = users.find(u => u.email === email)

    if (!user) throw new ExpressError("Wrong email or password!", 401)

    const match = await bcrypt.compare(password, user.password)

    if (!match) throw new ExpressError("Wrong email or password!", 401)

    const token = jwt.sign({ user: req.body }, tokenSecret, { expiresIn: '24h' })

    res.json({ token })

}