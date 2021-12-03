require('dotenv').config()
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('kcors')
const respond = require('koa-respond')
const compress = require('koa-compress')

const app = new Koa()

app
    .use(compress())
    .use(respond())
    .use(cors())
    .use(bodyParser())

module.exports = app
