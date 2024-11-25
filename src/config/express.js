const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const path = require('path');
//const helmet = require('helmet');
const router = require('../api/routes');
const { logs } = require('./vars');
const error = require('../api/middlewares/error');
//------------ for upload ------------//
const multer = require('multer');
const xlsx = require('xlsx');
const root = path.join(__dirname, '../../public');

//const passport = require('./passport');

/**
* Express instance
* @public
*/
const app = express();

// request logging. dev: console | production: file
app.use(morgan(logs));

// parse body params and attache them to req.body
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());
app.use(express.static(root));


// secure apps by setting various HTTP headers
//app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// Initialize Passport middleware
//app.use(passport.initialize());

// mount api v1 routes
app.use('/v1', router);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

module.exports = app;
