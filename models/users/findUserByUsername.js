module.exports = (db) => (username) => db('users').where({ username }).first()
