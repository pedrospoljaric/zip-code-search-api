const { prop } = require('lodash/fp')
const { calculateShippingFeeAndDeliveryTIme } = require('../../../services/correios')
const { customError } = require('../../../utils')

module.exports = async ({ zipCode } = {}) => {
    if (!Number(zipCode)) throw customError('Invalid zip code', 400)

    const shippingDetails = await calculateShippingFeeAndDeliveryTIme(process.env.SOURCE_ZIP_CODE, `${zipCode}`)

    return {
        shippingDetails: {
            shippingFee: prop('shippingFee', shippingDetails),
            deliveryTime: prop('deliveryTime', shippingDetails)
        }
    }
}
