const swag = require('../models/swag');

module.exports = {
  add: (req, res) => {
    const { id } = req.params;
    const { session } = req;
    if(session.user.cart.id === +id){
      res.status(200).send(session.user)
    } else {
      const index = swag.findIndex(item => item.id == id);
      session.user.cart.push(swag[index]);
      session.user.total += swag[index].price;
      res.status(200).send(session.user)
    }

  },
  delete: (req, res) => {
    const { id } = req.params;
    const { session } = req;
    const index = session.user.cart.findIndex(item => item.id == id);
    session.user.total -= session.user.cart[index].price;
    session.user.cart.splice(index, 1);
    res.status(200).send(session.user);
  },
  checkout: (req, res) => {
    const { session } = req;
    session.user.cart = [];
    session.user.total = 0;
    res.status(200).send(session.user);
  }
}