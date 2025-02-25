Promise = require("bluebird"); 
const { port, env } = require("./config/vars");
const logger = require("./config/logger");
const app = require("./config/express");
const mysql = require("./config/mysql");
const axios = require("axios");
const cron = require("node-cron");
const fs = require("fs");
const https = require("https");


// const options = {
//     key: fs.readFileSync("/var/webuzo/users/studionomy/ssl/studionomy.com.key"),  // Path to your private key
//     cert: fs.readFileSync("/var/webuzo/users/studionomy/ssl/studionomy.com-combined.pem") // Path to your certificate
// };



// https.createServer(options, app).listen(port);
app.listen(port, () => logger.info(`Server started on port ${port} || 5000 (${env})`));


module.exports = app;
