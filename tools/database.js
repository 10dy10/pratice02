const mysql = require('mysql')
const config = require('../secret/config')

var connection = mysql.createConnection({
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.name,
})
module.exports = connection