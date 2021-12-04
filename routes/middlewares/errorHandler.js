const { prop } = require('lodash/fp')

module.exports = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        ctx.send(prop('status', error), {
            message: prop('message', error)
        })
    }
}
