'use strict';

module.exports = appInfo => {
  const config = exports = require('./env_config.js')(appInfo);
  config.modelNotDefault = require('./model_not_default.js')(appInfo);
  if (!config.defaultDbName) config.defaultDbName = config.koaOrm[0].name;
  if (!config.readDdArr) config.readDdArr = [];

  /**
   * some description
   * @member Config#test
   * @property {String} key - some description
   */
  config.keys = appInfo.name + '_klsdjklfhdjkfh';
  // 配置需要的中间件，数组顺序即为中间件的加载顺序
  config.middleware = [ 'koaOrm' ];
  // xml数据过滤配置 插件放到app.js里面
  // config.xmlBody = {
  //   //limit: 128,
  //   encoding: 'utf8', // lib will detect it from `content-type`
  //   xmlOptions: {
  //     explicitArray: false
  //   },
  //   onerror: (err, ctx) => {
  //     ctx.throw(err.status, err.message);
  //   }
  // };


  // 跨域白名单
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [

    ],
  };
  // 跨域配置
  config.cors = {
    origin: '*',
    // credentials: true, // 开启认证
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };


  return config;
};
