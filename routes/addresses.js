const Router = require('koa-router')

const { getAddressByZipCode } = require('../controllers/addresses')

module.exports = new Router()
    .get('/', getAddressByZipCode)
    .routes()
