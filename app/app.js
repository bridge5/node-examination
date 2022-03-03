'use strict';

const path = require('path');
const redis = require('egg-redis/lib/redis');

module.exports = app => {
  // 把xml解析器放到前面去
  // app.config.coreMiddleware.unshift('xmlBody');
  // 挂载 util相关函数到app下
  const utilDirectory = path.join(app.config.baseDir, 'app/util');
  app.loader.loadToApp(utilDirectory, 'util');
  // 挂载params
  const paramsDirectory = path.join(app.config.baseDir, 'app/form');
  app.loader.loadToContext(paramsDirectory, 'form');

  // 挂载另一份Orm
  app.orm = require('koa-orm')(app.config.koaOrm).database;
  redis(app);
};
