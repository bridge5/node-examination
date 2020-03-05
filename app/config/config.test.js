/*
 * test config
 */

'use strict';

module.exports = {
    env: process.env.NODE_ENV || 'test',
    port: process.env.APP_PORT || 3000,
    mongodbUrl: 'mongodb://localhost:27017/development'
};
