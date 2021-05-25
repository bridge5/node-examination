/**
 * File: index.js
 * Project: node-examination
 * FilePath: /middleware/index.js
 * Created Date: 2021-05-24 17:58:51
 * Author: SaltFish l1218838196@gmail.com
 * -----
 * Last Modified: 2021-05-24 18:16:59
 * Modified By: SaltFish
 * -----
 * Description:
 */
const koa = require('koa')

const middlewareList = [
  require('./mongoModels'),
  require('./validators'),
  require('koa-body')(),
]

/**
 * 中甲件注册中心
 * @param {koa} app 
 */
const initMiddleWare = (app) => {
  middlewareList.forEach((middleware) => {
    app.use(middleware)
  })
}

module.exports = initMiddleWare
