var Odoo = require('odoo-xmlrpc')
var config = require('./config')

var odoo = new Odoo({
  url: config.DB_SERVER,
  db: config.DB_NAME,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD
})

module.exports = odoo
