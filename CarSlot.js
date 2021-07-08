class CarSlot {
    constructor(id, licensePlate) {
        this.id = id
        this.licensePlate = licensePlate
    }

    get isEmpty() {
        return this.licensePlate === null
    }

    get info() {
        return {
            id: this.id,
            isEmpty: this.isEmpty,
            licensePlate: this.licensePlate
        }
    }

    parkCar(licensePlate) {
        if (!this.isEmpty) {
            throw new Error("Slot is not empty")
        }

        this.licensePlate = licensePlate
    }

    unparkCar() {
        this.licensePlate = null
    }

}

module.exports = CarSlot
