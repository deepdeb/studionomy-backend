Promise = require("bluebird"); 
const { port, env } = require("./config/vars");
const logger = require("./config/logger");
const app = require("./config/express");
const mysql = require("./config/mysql");
const axios = require("axios");
const cron = require("node-cron");
//mysql.connect();

// listen to requests
app.listen(port, () => logger.info(`Server started on port ${port} || 5000 (${env})`));
//app.listen(5000, () => logger.info(`Server started on port ${5000}`));

/**
 * Exports express
 * @public
 */
module.exports = app;
