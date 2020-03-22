'use strict';

const _ = require('lodash');
const pkg = require('../package.json');
let config = require('./config_default');


// 自定义的配置：测试环境
const envList = ['test'];
if (envList.indexOf(process.env.NODE_ENV) >= 0) {
  try {
    const envConfig = require(`./config_${process.env.NODE_ENV}`);
    config = _.merge(config, envConfig);
  } catch (e) {
    global.console.log('[ERROR] loading config/config.js failed:', e.message);
  }
}

// 开发人员可配置的环境
try {
  const envConfig = require('./config');
  config = _.merge(config, envConfig);
} catch (e) {
  if (!config.debug || e.code !== 'MODULE_NOT_FOUND') {
    console.log('[ERROR] loading config/config.js failed:', e.message); // eslint-disable-line
  }
}

let globalConfig = {};
const globalConfigFile = `/opt/conf/${pkg.name}/config.js`;
try {
  globalConfig = require(globalConfigFile);
  config = _.merge(config, globalConfig);
} catch (e) {
  if (!config.debug || e.code !== 'MODULE_NOT_FOUND') {
    console.log(`[ERROR] loading ${globalConfigFile} failed:`, e.message); // eslint-disable-line
  }
}

module.exports = config;
