const Router = require('koa-router')

const { getAddressByZipCode } = require('../controllers/addresses')
const { getShippingDetails } = require('../controllers/addresses/shipping')

module.exports = new Router()
    .get('/', getAddressByZipCode)
    .get('/shipping', getShippingDetails)
    .routes()
