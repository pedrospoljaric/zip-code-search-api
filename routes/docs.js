const Router = require('koa-router')
const yamljs = require('yamljs')
const { koaSwagger } = require('koa2-swagger-ui')

const spec = yamljs.load(`${__dirname}/swagger.yaml`)

module.exports = new Router()
    .get('/', koaSwagger({ routePrefix: false, swaggerOptions: { spec } }))
    .routes()
