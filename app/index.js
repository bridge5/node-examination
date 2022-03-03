'use strict';

module.exports = require('./lib/framework.js');
process.env.EGG_SERVER_ENV = 'prod';
process.env.NODE_ENV = 'production';

require('egg').startCluster({
  baseDir: __dirname,
  // port: 7001, // default to 7001
});
