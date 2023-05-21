const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env['MYSQL_HOST'] || '127.0.0.1',
    port: process.env['MYSQL_PORT'], 
    user: process.env['MYSQL_USERNAME'],
    password: process.env['MYSQL_PASSWORD'],
    database: process.env['MYSQL_DATABASE']
  }
});
const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;