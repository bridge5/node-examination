const _       = require('lodash');
const winston = require('winston');
const moment  = require('moment');
const Logger  = winston.Logger;
const Console = winston.transports.Console;

let formatter = function (options) {
  let time     = moment().format('YYYY-MM-DD HH:mm:ss Z');
  let logLevel = _.padEnd(`[${options.level.toUpperCase()}]`, 0);
  return `[${time}]-${logLevel}-${options.message}`;
};

let transports = [
  new Console({
    formatter: formatter,
    level: 'silly',
    handleExceptions: true,
    colorize: true
  }),
];

let logger = new Logger({
  level: winston.config.npm.levels, //winston.config[cli/syslog/npm].levels
  transports: transports
});

logger.stream = {
  write: function loggerWrite(message, encoding){ /* eslint-disable-line no-unused-vars */
    logger.info(message);
  }
};

// Each level is given a specific integer priority.
// The higher the priority the more important the message is considered to be, and the lower the corresponding integer priority.
// For example, npm logging levels are prioritized from 0 to 5 (highest to lowest):
// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

module.exports = logger;
