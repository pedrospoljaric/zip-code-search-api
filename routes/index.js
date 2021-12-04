const Router = require('koa-router')
const addresses = require('./addresses')

module.exports = new Router()
    .use('/addresses', addresses)
    .routes()
