const ShortUrl = require('../models/ShortUrl');

exports.store = (req, res) => {
  let short_url = {};
  console.log(req);
  short_url.short_url = req.body.short_url;
  short_url.original_url = req.body.original_url;
  ShortUrl.create(short_url).then((id) => {
    console.log('ShortUrl created with id: ', id);
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      ShortUrl.find(id).then((short_url) => res.json(short_url));
    } else {
      res.redirect('/');
    }
  });
}



//check
exports.update = (req, res) => {
  console.log(req);
  let short_url = {};
  short_urlId = req.body.id;
  short_url.id = req.body.id
  let updateShortUrl = {
    visits: req.body.visits
  }
  console.log('ShortUrl updated with id: ', short_urlId);
  ShortUrl.update(short_urlId, updateShortUrl).then((id) => {
    
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      console.log('ShortUrl updated with id: ', short_urlId);
      ShortUrl.find(short_urlId).then((short_url) => res.json(short_url));
    } else {
      res.redirect('/');
    }
  });
}


exports.delete = (req, res) => {
  console.log(req);
  let short_url = {};
  short_urlId = req.body.id;
  short_url.id = req.body.id;
  ShortUrl.delete(short_url).then((id) => {
    console.log('ShortUrl deleted with id: ', short_urlId);
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      res.json(short_url);
    } else {
      res.redirect('/');
    }
  });
}


exports.findAll = (req, res) => {
  let short_urls = ShortShortUrl.all().then((short_urls) => {
    res.json(short_urls);
  });
}

exports.find = (id) => {
  return knex
    .select('*')
    .from('short_url')
    .where('id', id)
    .first();
}



// Muestra el producto
exports.show = (req, res) => {
  // Obtiene el id que viene en la url
  let short_url_string = req.params.short_url;
  // Busca dentro de la base de datos el producto con el id indicado
  ShortUrl.findByName(short_url_string).then((short_url) => {
    // Si el producto no existe entonces
    if (short_url == null) {
      // Regresa el error 404
      res.status(404).send('Not found');
      return;
    }
    // Si el producto existe entonces muestra la vista products/show.hbs
    // con la información del producto
    res.json(short_url);
  });
}