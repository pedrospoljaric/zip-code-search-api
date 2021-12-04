exports.up = (knex) => knex.schema.createTable('users', (table) => {
    table.increments()
    table.text('username').notNullable()
    table.text('hashed_password').notNullable()
})

exports.down = (knex) => knex.schema.dropTable('users')
