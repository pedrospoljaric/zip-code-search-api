module.exports = (db) => (zipCode) => db('addresses').where({ zip_code: zipCode }).first()
