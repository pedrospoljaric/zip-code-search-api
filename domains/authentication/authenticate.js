const argon2 = require('argon2')
const { prop } = require('lodash/fp')
const db = require('../../database')
const { findUserByUsername } = require('../../models/users')
const { customError } = require('../../utils')
const createToken = require('../../utils/jsonwebtoken/createToken')

module.exports = async ({ username, password } = {}) => {
    if (!username || !password) throw customError('Credentials not provided', 400)

    const user = await findUserByUsername(db)(username)
    if (!user) throw customError('User not found', 404)

    const passwordMatches = await argon2.verify(prop('hashed_password', user), password)
    if (!passwordMatches) throw customError('Invalid credentials', 401)

    const token = createToken({ id: prop('id', user) })

    return {
        token
    }
}
