const jwt = require('jsonwebtoken')

const ONE_DAY_IN_SECONDS = 60 * 60 * 24

module.exports = (payload, expiresIn = ONE_DAY_IN_SECONDS) => jwt.sign(payload, process.env.JWT_PASSWORD, { expiresIn })
