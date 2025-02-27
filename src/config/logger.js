const { logs } = require('./vars');
const winston = require('winston');
const { combine, timestamp, label, printf } = winston.format;
const fs = require('fs')
const path = require('path')

// Custom log format to include timestamp and level
const customFormat = printf(({ timestamp, level, message }) => {
  return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});


// Log file paths
const logFilePaths = ['error.log', 'warn.log', 'info.log', 'debug.log', 'combined.log'];


// Function to check if the log files exist and create them if not
const createLogFileIfNotExist = (filePath) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '', 'utf8');
  }
};


logFilePaths.forEach((filePath) => {
  createLogFileIfNotExist(path.join(__dirname, '../../', filePath));
});


const loggerTransports = [
  // Separate transport for error logs in all modes
  new winston.transports.File({
    filename: 'error.log',
    level: 'error',
    format: combine(timestamp(), customFormat),
  }),
  // Separate transport for warn logs in all modes
  new winston.transports.File({
    filename: 'warn.log',
    level: 'warn',
    format: combine(timestamp(), customFormat),
  }),
];

if (logs === 'dev') {
  // Add transports for dev mode
  loggerTransports.push(
    new winston.transports.File({
      filename: 'info.log',
      level: 'info',
      format: combine(timestamp(), customFormat),
    }),
    new winston.transports.File({
      filename: 'debug.log',
      level: 'debug',
      format: combine(timestamp(), customFormat),
    }),
    new winston.transports.File({
      filename: 'combined.log',
      format: combine(timestamp(), customFormat),
    }),
    new winston.transports.Console({
      format: combine(timestamp(), customFormat),
    })
  );
} else if (logs === 'test') {
  // Add transports for test mode
  loggerTransports.push(
    new winston.transports.File({
      filename: 'info.log',
      level: 'info',
      format: combine(timestamp(), customFormat),
    }),
    new winston.transports.File({
      filename: 'debug.log',
      level: 'debug',
      format: combine(timestamp(), customFormat),
    })
  );
} else {
  // Add transports for prod mode
  loggerTransports.push(
    new winston.transports.File({
      filename: 'info.log',
      level: 'info',
      format: combine(timestamp(), customFormat),
    })
  );
}

const logger = winston.createLogger({
  level: 'debug', // Set the highest level to capture all logs in dev mode
  transports: loggerTransports,
  format: combine(timestamp(), customFormat), // Default format for logger
});

logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

module.exports = logger;
