const Url = require('../models/Url');

exports.store = (req, res) => {
  let url = {};
  console.log(req);
  url.url = req.body.url;
  Url.create(url).then((id) => {
    console.log('Url created with id: ', id);
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      Url.find(id).then((url) => res.json(url));
    } else {
      res.redirect('/');
    }
  });
}



//check
exports.update = (req, res) => {
  console.log(req);
  let url = {};
  urlId = req.body.id;
  url.id = req.body.id
  let updateUrl = {
    visits: req.body.visits
  }
  console.log('Url updated with id: ', urlId);
  Url.update(urlId, updateUrl).then((id) => {
    
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      console.log('Url updated with id: ', urlId);
      Url.find(urlId).then((url) => res.json(url));
    } else {
      res.redirect('/');
    }
  });
}


exports.delete = (req, res) => {
  console.log(req);
  let url = {};
  urlId = req.body.id;
  url.id = req.body.id;
  Url.delete(url).then((id) => {
    console.log('Url deleted with id: ', urlId);
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      res.json(url);
    } else {
      res.redirect('/');
    }
  });
}


exports.findAll = (req, res) => {
  let urls = Url.all().then((urls) => {
    res.json(urls);
  });
}

exports.find = (id) => {
  return knex
    .select('*')
    .from('url')
    .where('id', id)
    .first();
}

// Muestra el producto
exports.show = (req, res) => {
  console.log(req);
  console.log(req.query);
  // Obtiene el id que viene en la url
  if(req.query.hasOwnProperty('url_id')){
      // Busca dentro de la base de datos el producto con el id indicado
      url_string = req.query.url_id
  Url.findById(url_string).then((url) => {
    // Si el producto no existe entonces
    if (url == null) {
      // Regresa el error 404
      res.json({});
      return;
    }
    // Si el producto existe entonces muestra la vista products/show.hbs
    // con la información del producto
    res.json(url);
  });

  }
  else{
    // Busca dentro de la base de datos el producto con el id indicado
    url_string = req.query.name
    Url.findByName(url_string).then((url) => {
      // Si el producto no existe entonces
      if (url == null) {
        // Regresa el error 404
        res.json({});
        return;
      }
      // Si el producto existe entonces muestra la vista products/show.hbs
      // con la información del producto
      res.json(url);
    });

  }

}