const parkingLot = require("./parkingLot")

const express = require('express')

const app = express()

app.use(express.json())

app.get("/info", (req, res) => {

    const info = {
        size: parkingLot.length,
        emptySlots: parkingLot.filter(slot => slot === null).length
    }

    res.json(info)
})


app.post("/park", (req, res) => {
    const { licensePlate } = req.body

    const emptySlot = parkingLot.indexOf(null)

    if (emptySlot === -1) {
        res.json({ error: "Parking lot is full!" })
        return;
    }

    parkingLot[emptySlot] = licensePlate

    console.log(parkingLot)

    const parked = {
        licensePlate,
        slot: emptySlot
    }

    res.json(parked)
})


const port = 3000

app.listen(port, () => console.log(`Listening on port ${port}`))