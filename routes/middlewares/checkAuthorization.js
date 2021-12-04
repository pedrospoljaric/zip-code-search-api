const { prop } = require('lodash/fp')
const { verifyTokenAndGetData } = require('../../utils/jsonwebtoken')
const { customError } = require('../../utils')

module.exports = async (ctx, next) => {
    const token = (prop('headers.authorization', ctx) || '').split(' ')[1]

    try {
        ctx.user = verifyTokenAndGetData(token)
    } catch (error) {
        throw customError('User not authorized', 401)
    }
    await next()
}
