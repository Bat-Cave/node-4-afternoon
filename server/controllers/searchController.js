const swag = require('../models/swag');

module.exports = {
  search: (req, res) => {
    const filteredSwag = swag.filter(swag => swag.category == req.query.category)
    if(req.query.category){
      res.status(200).send(filteredSwag)
    } else {
      res.status(200).send(swag)
    }
  }
}