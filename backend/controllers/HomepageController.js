const Pedido = require('../models/Url');

exports.index = (req, res) => {
  let pedidos = Pedido.all().then((pedidos) => {
    res.json(pedidos);
  });
}
