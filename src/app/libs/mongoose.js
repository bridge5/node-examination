let config   = require('../../config');
let logger   = require('./logger');
let _        = require('lodash');
let mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
mongoose.set('debug', config.env === 'dev');

let client = mongoose.createConnection(config.mongoose.uri, config.mongoose.options);

client.on('error', function (err) {
  logger.error('mongoose err: %j', err);
});
client.on('connecting', function () {
  logger.info(config.mongoose.uri + ' connecting');
});
client.on('connected', function () {
  logger.info(config.mongoose.uri + ' connected');
});
client.on('disconnected', function () {
  logger.warn(config.mongoose.uri + ' disconnected');
});
client.on('reconnected', _.debounce(function () {
  logger.warn(config.mongoose.uri + ' reconnected');
}, 3000));
client.on('close', function () {
  logger.warn(config.mongoose.uri + ' close');
});

module.exports = client;
//module.exports.GridFs = Grid(client.db, mongoose.mongo);