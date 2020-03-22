'use strict';

const moment = require('moment');
const pkg = require('../package.json');

const dateFormat = function() {
  return '[' + moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ']';
};

module.exports = {
  debug: true,
  projectName: 'node-example',
  env: 'dev',
  port: 9070,
  logger: {
    dev: {
      name: 'dev',
      level: 'debug',
      json: false,
      colorize: 'all',
      localTime: true,
      label: process.pid,
      timestamp: dateFormat,
    },
    prd: {
      name: 'prd',
      level: 'info',
      json: false,
      colorize: false,
      localTime: true,
      label: process.pid,
      timestamp: dateFormat,
      datePattern: 'YYYY-MM-DD',
      filename: 'server.%DATE%.log',
      dirname: `/data/${pkg.name}/logs/`,
      maxFiles: '60d',
    },
  },
  mysql: {
    user: 'root',
    password: '123456',
    database: 'example',
    orm: {
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      query: {
        raw: true,
      },
      pool: {
        max: 10000,
        min: 0,
        idle: 10000,
        handleDisconnects: true,
      },
      dialectOptions: {
        connectTimeout: 10000,
        dateStrings: true,
        typeCast: true,
      },
      timezone: '+08:00',
      logging: true,
    },
  },
  urlPrefix: {
    prefix: '/api/v1/example',
  },
};
