const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: 'todoapp'
})

module.exports = pool