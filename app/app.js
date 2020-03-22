'use strict';

const Koa = require('koa');
const config = require('./config');
const log = require('./common/log');

const app = new Koa();
// 提前暴露 app，session 中间件需要使用
module.exports = app;

const middleware = require('./middleware');

// 中间件
middleware(app);

log.info(`============= env: ${config.env} =============`);

const server = app.listen(config.port, '0.0.0.0', () => {
  log.info('Server listening on port: ' + server.address().port);
});
