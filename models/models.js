var odoose = require('odoose')
var db = require('../db')

odoose.connect(db, {})

var Produce = odoose.model('Produce', require('./produce'), 'product.template')

var models = {
  Produce: Produce
}

module.exports = exports = models
