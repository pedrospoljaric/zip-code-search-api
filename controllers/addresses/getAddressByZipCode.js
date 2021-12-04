const { prop } = require('lodash/fp')
const { getAddressByZipCode } = require('../../domains/addresses')

module.exports = (ctx) => getAddressByZipCode({
    zipCode: Number(prop('query.zipCode', ctx))
}).then((data) => ctx.send(200, { success: true, data }))
