/*
 * config
 */

'use strict';

const CONFIG = Symbol('Application#CONFIG');

module.exports = () => {
    if (!this[CONFIG]) {
        // base config
        const envConfig = require(`./config.${process.env.NODE_ENV || 'development'}`);
        // business config
        const buinessConfig = {

        };
        this[CONFIG] = Object.assign(envConfig, buinessConfig);
    };
    return this[CONFIG];
};
