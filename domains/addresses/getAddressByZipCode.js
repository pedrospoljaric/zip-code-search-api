/* eslint-disable no-await-in-loop */
const db = require('../../database')
const { findAddressByZipCode } = require('../../models/addresses')
const { customError, replaceNumberLastDigitsByZero } = require('../../utils')

module.exports = async ({ zipCode } = {}) => {
    if (!Number(zipCode)) throw customError('Invalid zip code', 400)

    let address
    let digitsChanged = 0
    while (!address && digitsChanged <= 8) {
        const zipCodeToTest = replaceNumberLastDigitsByZero(zipCode, digitsChanged)
        address = await findAddressByZipCode(db)(zipCodeToTest)
        digitsChanged += 1
    }

    if (!address) throw customError(`Address of zip code ${zipCode} not found`, 404)

    return {
        address
    }
}
