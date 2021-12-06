const jwt = require('jsonwebtoken')
const createToken = require('../../../../services/jsonwebtoken/createToken')

it('Should return token based on the payload and environment password', () => {
    expect(jwt.verify(createToken({ id: 3 }), process.env.JWT_PASSWORD)).toMatchObject({ id: 3 })
    expect(jwt.verify(createToken({ id: 'xxx' }), process.env.JWT_PASSWORD)).toMatchObject({ id: 'xxx' })
})

it('Should throw error if no payload is provided', () => {
    expect(() => createToken()).toThrow('payload is required')
})

it('Should throw error if invalid payload is provided', () => {
    expect(() => createToken(null)).toThrow('Expected "payload" to be a plain object.')
})
