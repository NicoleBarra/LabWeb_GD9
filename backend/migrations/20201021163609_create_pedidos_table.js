
exports.up = function(knex) {
    return knex.schema
    .createTable('url',(table)=>{
        table.increments('id');
        table.string('url', 560).notNullable();
        table.integer('visits').defaultTo(0);
    })
    .createTable('short_url',(table)=>{
        table.increments('id');
        table.integer('original_url').unsigned().notNullable();
        table.string('short_url', 120).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema
      .dropTable('url')
      .dropTable('short_url');
  };