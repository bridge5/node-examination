/*
 * production config
 */

'use strict';

module.exports = {
    env: process.env.NODE_ENV || 'production',
    port: process.env.APP_PORT || 3000,
    mongodbUrl: 'mongodb://localhost:27017/production'
};
