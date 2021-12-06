const { prop } = require('lodash/fp')
const { verifyTokenAndGetData } = require('../../services/jsonwebtoken')
const { customError } = require('../../utils')

module.exports = async (ctx, next) => {
    const token = (prop('headers.authorization', ctx) || '').split(' ')[1]

    try {
        const tokenData = verifyTokenAndGetData(token)
        ctx.user = { id: prop('id', tokenData) }
    } catch (error) {
        throw customError('User not authorized', 401)
    }
    await next()
}
