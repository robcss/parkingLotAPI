require('dotenv').config()

const SIZE = parseInt(process.env.SIZE) || 5

const parkingLot = Array(SIZE).fill(null) // create in-memory database, null = empty lot

module.exports = parkingLot
