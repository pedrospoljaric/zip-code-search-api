const Router = require('koa-router')

const { authenticate } = require('../controllers/authentication')

module.exports = new Router()
    .post('/authenticate', authenticate)
    .routes()
