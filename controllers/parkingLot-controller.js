require('dotenv').config()

const ExpressError = require("../ExpressError")

const SIZE = parseInt(process.env.SIZE) || 5

const ParkingLot = require("../models/ParkingLot")

const parkingLot = new ParkingLot(SIZE) // in-memory parking lot store


module.exports.getInfo = (req, res) => {
    res.json(parkingLot.info)
}

module.exports.getSlot = (req, res) => {
    const { id } = req.body

    try {
        const slot = parkingLot.findSlotById(id)

        res.json(slot.info)

    } catch (err) {
        throw new ExpressError(err.message, 400)
    }
}

module.exports.park = (req, res) => {
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
}

module.exports.unpark = (req, res) => {
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
}

