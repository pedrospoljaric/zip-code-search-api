const { customError } = require('../../../../utils')

jest.resetModules()
jest.doMock('../../../../services/correios/calculateShippingFeeAndDeliveryTIme', () => (sourceZipCode, destinationZipCode) => {
    if (sourceZipCode === process.env.SOURCE_ZIP_CODE && destinationZipCode === 12210130) {
        return {
            shippingFee: 22.50,
            deliveryTime: 3
        }
    }
    throw customError('Could not retrieve shipping price and delivery time', 503)
})

const getShippingDetails = require('../../../../domains/shipping/getShippingDetails')

it('Should return shipping details if a valid destination zip code is provided', async () => {
    expect(await getShippingDetails({ zipCode: 12210130 })).toMatchObject({
        shippingDetails: {
            shippingFee: 22.50,
            deliveryTime: 3
        }
    })
})

it('Should throw error if no destination zip code is provided', async () => {
    await expect(getShippingDetails()).rejects.toThrow('Invalid zip code')
})

it('Should throw error if the destination zip code provided is not a number', async () => {
    await expect(getShippingDetails({ zipCode: 'xxx' })).rejects.toThrow('Invalid zip code')
    await expect(getShippingDetails({ zipCode: null })).rejects.toThrow('Invalid zip code')
    await expect(getShippingDetails({ zipCode: { x: 1 } })).rejects.toThrow('Invalid zip code')
})

it('Should throw error if the zip code provided cannot be found', async () => {
    await expect(getShippingDetails({ zipCode: 12210144 })).rejects.toThrow('Could not retrieve shipping price and delivery time')
})
