const { prop } = require('lodash/fp')
const { authenticate } = require('../../domains/authentication')

module.exports = (ctx) => authenticate({
    username: prop('body.username', ctx),
    password: prop('body.password', ctx)
}).then((data) => ctx.send(200, { success: true, data }))
