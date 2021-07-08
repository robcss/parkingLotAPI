require('dotenv').config()

const SIZE = parseInt(process.env.SIZE) || 5

const ParkingLot = require("./ParkingLot")

const parkingLot = new ParkingLot(SIZE)

const ExpressError = require("./ExpressError")

const express = require('express')

const app = express()

app.use(express.json())

app.get("/info", (req, res) => {
    res.json(parkingLot.info)
})

app.get("/slot", (req, res) => {
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