const Router = require('koa-router')
const addresses = require('./addresses')

const { errorHandler } = require('./middlewares')

module.exports = new Router()
    .use(errorHandler)
    .use('/addresses', addresses)
    .routes()
