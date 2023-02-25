/* This is a module that exports a promise-based connection pool to a MySQL database using the mysql2 library.
The connection pool is created using the mysql2 module's createPool method, which takes an object with configuration options for the pool. The configuration options are loaded from a config.json file, which is required at the beginning of the module.
The connection pool is then exported using the promise() method of the mysql2 module's pool object, which enables the use of promises for database operations instead of callbacks.
This approach to connecting to a MySQL database using a connection pool is common in Node.js applications, as it allows for efficient management of database connections and improves performance.
25/02/2023 Indika Sirimanna */
const mysql = require('mysql2');

const config = require('../config/config.json');

const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    database : config.database,
    password : config.password ,
});

module.exports = pool.promise();