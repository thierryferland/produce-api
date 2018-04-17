var dbServer
var dbName

if (process.env.NODE_ENV === 'production') {
  dbServer = 'https://odoo.instance.com'
  dbName = 'odoo_db'
} else if (process.env.NODE_ENV === 'uat') {
  dbServer = 'https://odoo.instance.com'
  dbName = 'odoo_db'
} else {
  dbServer = 'https://odoo.instance.com'
  dbName = 'odoo_db'
}

module.exports = {
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'UMMMM',
  API_VERSION: 'v1',
  SERVER_KEY: 'server.key',
  SERVER_CRT: 'server.crt',
  PORT: 5005,
  DB_SERVER: dbServer,
  DB_NAME: dbName,
  DB_USERNAME: 'odoo@odoo.com',
  DB_PASSWORD: 'Password1'
}
