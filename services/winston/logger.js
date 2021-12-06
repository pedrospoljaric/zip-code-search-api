const { createLogger, format, transports } = require('winston')

const logger = createLogger({
    level: process.env.NODE_ENV === 'test' ? 'info' : 'debug',
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.simple(),
        format.printf((info) => `${info.timestamp} - ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.Console()
    ]
})

module.exports = logger
