const Router = require('koa-router')

const { getShippingDetails } = require('../controllers/shipping')

module.exports = new Router()
    .get('/', getShippingDetails)
    .routes()
