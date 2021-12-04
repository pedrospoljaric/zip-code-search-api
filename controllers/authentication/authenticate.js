const { prop } = require('lodash/fp')
const { authenticate } = require('../../domains/authentication')

module.exports = (ctx) => authenticate({
    username: prop('request.body.username', ctx),
    password: prop('request.body.password', ctx)
}).then((data) => ctx.send(200, { success: true, data }))
