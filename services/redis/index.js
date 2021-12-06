const Keyv = require('keyv')

const keyv = process.env.REDIS_CONNECTION_STRING ? new Keyv(process.env.REDIS_CONNECTION_STRING) : new Keyv()

module.exports = keyv
