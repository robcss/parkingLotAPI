const express = require('express')

const catchAsync = require("./catchAsync")

const rateLimiter = require("./middleware/rateLimiter")
const verifyToken = require("./middleware/verifyToken")

const usersController = require("./controllers/users-controller")
const parkingController = require("./controllers/parkingLot-controller")


const app = express()

app.use(express.json())

app.use(rateLimiter)

app.post("/signup", catchAsync(usersController.signup))

app.post("/login", catchAsync(usersController.login))

app.get("/parkingLot", verifyToken, parkingController.getInfo)

app.get("/slot", verifyToken, parkingController.getSlot)

app.post("/park", verifyToken, parkingController.park)


app.delete("/unpark", parkingController.unpark)

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    if (!err.message) err.message = "Something went wrong!"
    res.status(statusCode).json({ error: err.message })
})

const port = 3000

app.listen(port, () => console.log(`Listening on port ${port}`))