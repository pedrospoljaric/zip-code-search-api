const { isUndefined } = require('lodash/fp')
const redis = require('../../services/redis')

module.exports = (db) => async (zipCode) => {
    const addressCacheKey = `addresses:${zipCode}`
    const addressCache = await redis.get(addressCacheKey)
    if (isUndefined(addressCache)) {
        const address = await db('addresses').where({ zip_code: zipCode }).first()
        await redis.set(addressCacheKey, address || null, 86400000)
        return address
    }
    return addressCache
}
