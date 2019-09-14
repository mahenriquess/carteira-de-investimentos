
exports.up = function(knex) {
    return knex.schema.createTable('usuarios', (table) => {
        table.increments('id').primary();
        table.string('nome').notNull();
        table.string('sobrenome').notNull();
        table.string('email').notNull();
        table.string('senha').notNull();
        table.string('status').notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuarios');
};
