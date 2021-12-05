const { prop } = require('lodash/fp')
const logger = require('../../services/winston/logger')

module.exports = async (ctx, next) => {
    await next()

    logger.debug(JSON.stringify({
        user: prop('user', ctx),
        request: `${prop('method', ctx)} ${prop('originalUrl', ctx)}`
    }))
}
