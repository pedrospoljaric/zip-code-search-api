const jwt = require('jsonwebtoken')
const verifyTokenAndGetData = require('../../../../services/jsonwebtoken/verifyTokenAndGetData')

it('Should return token data based on the token and environment password', () => {
    expect(verifyTokenAndGetData(jwt.sign({ id: 3 }, process.env.JWT_PASSWORD))).toMatchObject({ id: 3 })
    expect(verifyTokenAndGetData(jwt.sign('xxx', process.env.JWT_PASSWORD))).toBe('xxx')
})

it('Should throw error if no token is provided', () => {
    expect(() => verifyTokenAndGetData()).toThrow('jwt must be provided')
})

it('Should throw error if invalid token is provided', () => {
    expect(() => verifyTokenAndGetData(null)).toThrow('jwt must be provided')
    expect(() => verifyTokenAndGetData('xxx')).toThrow('jwt malformed')
    expect(() => verifyTokenAndGetData(123)).toThrow('jwt must be a string')
    expect(() => verifyTokenAndGetData(true)).toThrow('jwt must be a string')
    expect(() => verifyTokenAndGetData({ x: 1 })).toThrow('jwt must be a string')
})
