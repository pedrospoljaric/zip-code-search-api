jest.resetModules()
jest.doMock('../../../models/addresses/findAddressByZipCode', () => () => (zipCode) => {
    if (zipCode === 12210130) {
        return {
            zip_code: 12210130,
            location: 'Av. Dr. João Guilhermino',
            district: 'Centro',
            city: 'São José dos Campos',
            state: 'São Paulo'
        }
    }
    return null
})
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
let token
beforeAll(async () => {
    server = app.listen()
    request = supertest(server)

    const response = await request.post('/api/v1/authentication/authenticate').send({ username: 'test', password: 'password' })
    token = prop('body.data.token', response)
})

afterAll(() => {
    server.close()
})

it('Should succeed and return address if existing zip code is provided', async () => {
    const response = await request.get('/api/v1/addresses?zipCode=12210130').set('authorization', `Bearer ${token}`)
    expect(prop('body', response)).toMatchObject({
        success: true,
        data: {
            address: {
                zip_code: 12210130,
                location: 'Av. Dr. João Guilhermino',
                district: 'Centro',
                city: 'São José dos Campos',
                state: 'São Paulo'
            }
        }
    })
})

it('Should succeed and return address if provided zip code is valid after replacements by zero', async () => {
    const response = await request.get('/api/v1/addresses?zipCode=12210133').set('authorization', `Bearer ${token}`)
    expect(prop('body', response)).toMatchObject({
        success: true,
        data: {
            address: {
                zip_code: 12210130,
                location: 'Av. Dr. João Guilhermino',
                district: 'Centro',
                city: 'São José dos Campos',
                state: 'São Paulo'
            }
        }
    })
})

it('Should fail and return error if non existing zip code is provided', async () => {
    const response = await request.get('/api/v1/addresses?zipCode=12210144').set('authorization', `Bearer ${token}`)
    expect(prop('body', response)).toMatchObject({
        success: false,
        error: {
            status: 404,
            message: 'Address of zip code 12210144 not found'
        }
    })
})

it('Should fail and return error if no zip code is provided', async () => {
    const response = await request.get('/api/v1/addresses').set('authorization', `Bearer ${token}`)
    expect(prop('body', response)).toMatchObject({
        success: false,
        error: {
            status: 400,
            message: 'Invalid zip code'
        }
    })
})

it('Should fail and return error if the zip code provided is not a number', async () => {
    const response = await request.get('/api/v1/addresses?zipCode=xxx').set('authorization', `Bearer ${token}`)
    expect(prop('body', response)).toMatchObject({
        success: false,
        error: {
            status: 400,
            message: 'Invalid zip code'
        }
    })
})
