require('dotenv').config()

const SIZE = parseInt(process.env.SIZE) || 5

const ParkingLot = require("./ParkingLot")

const parkingLot = new ParkingLot(SIZE) // in-memory parking lot store

const users = [] // in-memory users store

const ExpressError = require("./ExpressError")
const catchAsync = require("./catchAsync")

const rateLimiter = require("./middleware/rateLimiter")
const verifyToken = require("./middleware/verifyToken")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")
const tokenSecret = "dropTest"

const express = require('express')

const app = express()

app.use(express.json())

app.use(rateLimiter)

app.post("/signup", catchAsync(async (req, res) => {
    const { email, password } = req.body

    const hash = await bcrypt.hash(password, 10)

    users.push({ email, password: hash })

    const token = jwt.sign({ email }, tokenSecret, { expiresIn: '24h' })

    res.json({ token })

}))

app.post("/login", catchAsync(async (req, res) => {
    const { email, password } = req.body

    const user = users.find(u => u.email === email)

    if (!user) throw new ExpressError("Wrong email or password!", 401)

    const match = await bcrypt.compare(password, user.password)

    if (!match) throw new ExpressError("Wrong email or password!", 401)

    const token = jwt.sign({ user: req.body }, tokenSecret, { expiresIn: '24h' })

    res.json({ token })

}))

app.get("/info", (req, res) => {
    res.json(parkingLot.info)
})

app.get("/slot", verifyToken, (req, res) => {
    const { id } = req.body

    try {
        const slot = parkingLot.findSlotById(id)

        res.json(slot.info)

    } catch (err) {
        throw new ExpressError(err.message, 400)
    }

})

app.post("/park", (req, res) => {
    const { licensePlate } = req.body

    try {
        const updatedSlot = parkingLot.park(licensePlate)

        res.json({
            action: "parking",
            updatedSlot: updatedSlot.info
        })

    } catch (err) {
        throw new ExpressError(err.message, 400)
    }
})


app.delete("/unpark", (req, res) => {
    const { licensePlate } = req.body

    try {
        const updatedSlot = parkingLot.unpark(licensePlate)

        res.json({
            action: "unparking",
            removedCarPlate: licensePlate,
            updatedSlot: updatedSlot.info
        })

    } catch (err) {
        throw new ExpressError(err.message, 400)
    }
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    if (!err.message) err.message = "Something went wrong!"
    res.status(statusCode).json({ error: err.message })
})

const port = 3000

app.listen(port, () => console.log(`Listening on port ${port}`))