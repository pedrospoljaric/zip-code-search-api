require('dotenv').config()
const http = require('http')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('kcors')
const respond = require('koa-respond')
const compress = require('koa-compress')
const mount = require('koa-mount')
const { createTerminus } = require('@godaddy/terminus')

const app = new Koa()

const routes = require('./routes')

app
    .use(compress())
    .use(respond())
    .use(cors())
    .use(bodyParser())
    .use(mount('/api/v1', routes))

const server = http.createServer(app.callback())

createTerminus(server, {
    healthChecks: {
        '/healthcheck': () => ({ status: 'ok' }),
        verbatim: true
    }
})

module.exports = server
