require('dotenv').config()
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('kcors')
const respond = require('koa-respond')
const compress = require('koa-compress')
const mount = require('koa-mount')

const app = new Koa()

const routes = require('./routes')

app
    .use(compress())
    .use(respond())
    .use(cors())
    .use(bodyParser())
    .use(mount('/api/v1', routes))

module.exports = app
