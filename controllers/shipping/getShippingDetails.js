const { prop } = require('lodash/fp')
const { getShippingDetails } = require('../../domains/shipping')

module.exports = (ctx) => getShippingDetails({
    zipCode: Number(prop('query.zipCode', ctx))
}).then((data) => ctx.send(200, { success: true, data }))
