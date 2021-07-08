const CarSlot = require("./CarSlot")

class ParkingLot {
    constructor(size) {
        this.size = size
        this.slots = this._createSlots()
    }

    _createSlots() {
        let emptySlots = []

        for (let i = 1; i <= this.size; i++) {
            const newSlot = new CarSlot(i, null)
            emptySlots.push(newSlot)
        }

        return emptySlots
    }

    get info() {
        return {
            size: this.size,
            emptySlots: this.slots.filter(slot => slot.isEmpty).length,
            carSlots: this.slots.map(slot => slot.info)
        }
    }

    findSlotById(id) {
        const foundSlot = this.slots.find(slot => slot.id === id)

        if (!foundSlot) {
            throw new Error(`Slot ${id} does not exist!`)
        }

        return foundSlot
    }

    park(licensePlate) {

        const emptySlot = this.slots.find(slot => slot.isEmpty)

        if (!emptySlot) {
            throw new Error("Parking lot is full!")
        }

        emptySlot.parkCar(licensePlate)

        return emptySlot

    }

    unpark(licensePlate) {

        const carSlot = this.slots.find(slot => slot.licensePlate === licensePlate)

        if (!carSlot) {
            throw new Error(`No car with license plate ${licensePlate} was found`)
        }

        carSlot.unparkCar(licensePlate)

        return carSlot

    }

}

module.exports = ParkingLot