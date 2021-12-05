const { prop, isEmpty, omit } = require('lodash/fp')
const logger = require('../../services/winston/logger')

module.exports = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        const status = prop('status', error) || 500
        const errorData = {
            status,
            message: prop('message', error)
        }

        const query = prop('query', ctx)
        const body = omit('password', prop('request.body', ctx))

        const loggerToUse = status >= 500 ? logger.error : logger.debug
        loggerToUse(JSON.stringify({
            user: prop('user', ctx),
            request: {
                url: `${prop('method', ctx)} ${prop('originalUrl', ctx)}`,
                query: !isEmpty(query) ? query : undefined,
                body: !isEmpty(body) ? body : undefined
            },
            error: errorData

        }))

        ctx.send(status, {
            success: false,
            error: errorData
        })
    }
}
