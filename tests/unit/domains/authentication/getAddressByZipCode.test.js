jest.resetModules()
jest.doMock('../../../../models/users/findUserByUsername', () => () => (username) => {
    if (username === 'test') {
        return {
            id: 1,
            username: 'test',
            hashed_password: '$argon2i$v=19$m=4096,t=3,p=1$8jpWDZ2kA4bpu4GQ9uNQCw$ETz86bLkO921F7TXnrSKlu/76Og/XcBwN08sQLRUfvs'
        }
    }
    return null
})

const jwt = require('jsonwebtoken')
const authenticate = require('../../../../domains/authentication/authenticate')

it('Should return token if user exists and password matches', async () => {
    const data = await authenticate({ username: 'test', password: 'password' })
    expect(data).toHaveProperty('token')
    expect(typeof data.token).toBe('string')
    expect(jwt.decode(data.token)).toMatchObject({ id: 1 })
})

it('Should throw error if user cannot be found', async () => {
    await expect(authenticate({ username: 'xxx', password: 'password' })).rejects.toThrow('User not found')
})

it('Should throw error if user or password were not provided', async () => {
    await expect(authenticate({ username: 'test' })).rejects.toThrow('Credentials not provided')
    await expect(authenticate({ password: 'password' })).rejects.toThrow('Credentials not provided')
    await expect(authenticate({ })).rejects.toThrow('Credentials not provided')
    await expect(authenticate()).rejects.toThrow('Credentials not provided')
})

it('Should throw error if password is incorrect', async () => {
    await expect(authenticate({ username: 'test', password: 'xxx' })).rejects.toThrow('Invalid credentials')
})
