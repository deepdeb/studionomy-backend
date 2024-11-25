const mysql = require('mysql2');
const logger = require('./../config/logger');
const bluebird = require('bluebird');
mysql.Promise = bluebird;

// MySQL config
const MYSQL_CONFIG = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  multipleStatements: true,
  connectTimeout: 60000, // 30 seconds (adjust as needed)
};

// Create a connection pool
const pool = mysql.createPool(MYSQL_CONFIG);
const readPool = pool.promise();
const writePool = pool.promise();

// Export the pools for use in other modules
module.exports = {
  readPool: readPool,
  writePool: writePool,
};
