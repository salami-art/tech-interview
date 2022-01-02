exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments();
        table.string('name', 250).notNullable();
        table.string('surname', 250).notNullable();
        table.date('birth_date', 250).notNullable();
        table.string('email', 500).notNullable();
        table.string('password', 500).notNullable();
        table.string('phone', 500).notNullable();
        table.string('identity', 500).notNullable();
        table.string('passport_number', 500).notNullable();

        table.timestamps();
    }).then(console.log('created user table'));
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
