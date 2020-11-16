const knex = require('../database/connection');



exports.all = () => {
  return knex
    .select('*')
    .from('short_url');
}

exports.create = (short_url) => {
  console.log("SHORT URL")
  console.log(short_url)
  return knex('short_url')
    .insert({ 
        original_url : short_url.original_url,
        short_url: short_url.short_url
    });
}


exports.update = (short_urlId, updateshort_url) => {
  return knex('short_url')
    .update(updateshort_url)
    .where('id', short_urlId);
}


exports.find = (id) => {
  return knex
    .select('*')
    .from('short_url')
    .where('id', id)
    .first();
}

exports.delete = (short_url) => {
  console.log("short_url id: ",short_url.id);
  return knex('short_url')
    .delete()
    .where('id', short_url.id);
}

exports.findByName = (short_url) => {
  return knex
    .select('*')
    .from('short_url')
    .where('short_url', short_url)
    .first();
}