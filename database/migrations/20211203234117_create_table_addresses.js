exports.up = (knex) => knex.schema.createTable('addresses', (table) => {
    table.integer('zip_code').primary()
    table.text('location').notNullable()
    table.text('district').notNullable()
    table.text('city').notNullable()
    table.text('state').notNullable()
})

exports.down = (knex) => knex.schema.dropTable('addresses')
