jest.resetModules()
jest.doMock('../../../models/users/findUserByUsername', () => () => (username) => {
    if (username === 'test') {
        return {
            id: 1,
            username: 'test',
            hashed_password: '$argon2i$v=19$m=4096,t=3,p=1$8jpWDZ2kA4bpu4GQ9uNQCw$ETz86bLkO921F7TXnrSKlu/76Og/XcBwN08sQLRUfvs'
        }
    }
    return null
})

const { prop } = require('lodash/fp')
const supertest = require('supertest')
const app = require('../../../app')

let server
let request
beforeAll(() => {
    server = app.listen()
    request = supertest(server)
})

afterAll(() => {
    server.close()
})

it('Should succeed and return token if credentials are correct', async () => {
    const response = await request.post('/api/v1/authentication/authenticate').send({ username: 'test', password: 'password' })
    expect(prop('body', response)).toMatchObject({
        success: true,
        data: {
            token: expect.any(String)
        }
    })
})

it('Should fail and return error if credentials are incorrect', async () => {
    const response = await request.post('/api/v1/authentication/authenticate').send({ username: 'test', password: 'xxx' })
    expect(prop('body', response)).toMatchObject({
        success: false,
        error: {
            status: 401,
            message: 'Invalid credentials'
        }
    })
})

it('Should fail and return error if credentials are not provided', async () => {
    const response = await request.post('/api/v1/authentication/authenticate').send({ username: 'test' })
    expect(prop('body', response)).toMatchObject({
        success: false,
        error: {
            status: 400,
            message: 'Credentials not provided'
        }
    })
    const response2 = await request.post('/api/v1/authentication/authenticate').send({ password: 'xxx' })
    expect(prop('body', response2)).toMatchObject({
        success: false,
        error: {
            status: 400,
            message: 'Credentials not provided'
        }
    })
    const response3 = await request.post('/api/v1/authentication/authenticate').send({ })
    expect(prop('body', response3)).toMatchObject({
        success: false,
        error: {
            status: 400,
            message: 'Credentials not provided'
        }
    })
    const response4 = await request.post('/api/v1/authentication/authenticate').send()
    expect(prop('body', response4)).toMatchObject({
        success: false,
        error: {
            status: 400,
            message: 'Credentials not provided'
        }
    })
})
