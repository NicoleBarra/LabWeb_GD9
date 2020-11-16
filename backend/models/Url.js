const knex = require('../database/connection');



exports.all = () => {
  return knex
    .select('*')
    .from('url');
}

exports.create = (url) => {
  return knex('url')
    .insert({ 
        url: url.url
    });
}


exports.update = (urlId, updateurl) => {
  return knex('url')
    .update(updateurl)
    .where('id', urlId);
}


exports.find = (id) => {
  return knex
    .select('*')
    .from('url')
    .where('id', id)
    .first();
}

exports.delete = (url) => {
  console.log("url id: ",url.id);
  return knex('url')
    .delete()
    .where('id', url.id);
}

exports.findById = (url) => {
  return knex
    .select('*')
    .from('url')
    .where('id', url)
    .first();
}

exports.findByName = (url) => {
  return knex
    .select('*')
    .from('url')
    .where('url', url)
    .first();
}