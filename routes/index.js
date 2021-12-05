const Router = require('koa-router')
const { errorHandler, checkAuthorization } = require('./middlewares')
const addresses = require('./addresses')
const authentication = require('./authentication')
const docs = require('./docs')

module.exports = new Router()
    .use('/docs', docs)
    .use(errorHandler)
    .use('/authentication', authentication)
    .use(checkAuthorization)
    .use('/addresses', addresses)
    .routes()
