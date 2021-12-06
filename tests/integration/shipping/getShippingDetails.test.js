const { prop } = require('lodash/fp')
const supertest = require('supertest')
const { customError } = require('../../../utils')

jest.resetModules()
jest.doMock('../../../services/correios/calculateShippingFeeAndDeliveryTIme', () => (sourceZipCode, destinationZipCode) => {
    console.log('oi', sourceZipCode === process.env.SOURCE_ZIP_CODE && destinationZipCode === '12210130')
    if (sourceZipCode === process.env.SOURCE_ZIP_CODE && destinationZipCode === '12210130') {
        return {
            shippingFee: 22.50,
            deliveryTime: 3
        }
    }
    throw customError('Could not retrieve shipping price and delivery time', 503)
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

it('Should succeed and return shipping details if existing zip code is provided', async () => {
    const response = await request.get('/api/v1/shipping?zipCode=12210130').set('authorization', `Bearer ${token}`)
    expect(prop('body', response)).toMatchObject({
        success: true,
        data: {
            shippingDetails: {
                shippingFee: 22.50,
                deliveryTime: 3
            }
        }
    })
})

it('Should fail and return error if non existing zip code is provided', async () => {
    const response = await request.get('/api/v1/shipping?zipCode=12210144').set('authorization', `Bearer ${token}`)
    expect(prop('body', response)).toMatchObject({
        success: false,
        error: {
            status: 503,
            message: 'Could not retrieve shipping price and delivery time'
        }
    })
})

it('Should fail and return error if no zip code is provided', async () => {
    const response = await request.get('/api/v1/shipping').set('authorization', `Bearer ${token}`)
    expect(prop('body', response)).toMatchObject({
        success: false,
        error: {
            status: 400,
            message: 'Invalid zip code'
        }
    })
})

it('Should fail and return error if the zip code provided is not a number', async () => {
    const response = await request.get('/api/v1/shipping?zipCode=xxx').set('authorization', `Bearer ${token}`)
    expect(prop('body', response)).toMatchObject({
        success: false,
        error: {
            status: 400,
            message: 'Invalid zip code'
        }
    })
})
