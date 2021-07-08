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

app.get("/slot", (req, res) => {
    const { slotId } = req.body

    const licensePlate = parkingLot[slotId - 1]

    if (licensePlate === undefined) {
        res.json({ error: `Slot ${slotId} does not exist!` })
        return;
    }

    if (licensePlate === null) {
        res.json({
            slotId,
            isEmpty: true
        })

        return;
    }

    console.log(parkingLot)

    res.json({
        slotId,
        isEmpty: false,
        licensePlate
    })

})

app.post("/park", (req, res) => {
    const { licensePlate } = req.body

    const emptySlotId = parkingLot.indexOf(null)

    if (emptySlotId === -1) {
        res.json({ error: "Parking lot is full!" })
        return;
    }

    parkingLot[emptySlotId] = licensePlate

    console.log(parkingLot)

    res.json({
        licensePlate,
        slotId: emptySlotId + 1
    })
})


app.delete("/unpark", (req, res) => {
    const { licensePlate } = req.body

    const carSlotId = parkingLot.indexOf(licensePlate)

    if (carSlotId === -1) {
        res.json({ error: `No car with license plate ${licensePlate} was found` })
        return;
    }

    parkingLot.splice(carSlotId, 1, null)

    console.log(parkingLot)

    res.json({
        licensePlate,
        slotId: carSlotId + 1
    })
})

const port = 3000

app.listen(port, () => console.log(`Listening on port ${port}`))