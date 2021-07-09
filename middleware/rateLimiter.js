
const rateLimit = require("express-rate-limit");

const windowMin = 10
const windowMs = windowMin * 60 * 1000 // 10 minutes in milliseconds
const max = 100 // limit each IP to 100 requests per windowMs

module.exports = rateLimit({
    windowMs,
    max,
    message: { error: `You have exceeded the ${max} requests in ${windowMin} minutes limit!` },
    headers: true
})