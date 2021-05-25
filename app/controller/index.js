/**
 * File: index.js
 * Project: node-examination
 * FilePath: /controller/index.js
 * Created Date: 2021-05-24 18:18:20
 * Author: SaltFish l1218838196@gmail.com
 * -----
 * Last Modified: 2021-05-24 20:46:51
 * Modified By: SaltFish
 * -----
 * Description:
 */

const koa = require('koa');
const Router = require('koa-router')
const config = require('../config')


const controllerList = [
  require('./player')
]

/**
 * 中间件注册中心
 * @param {koa} app 
 */
const initController = (app) => {
  const router = new Router({
    prefix: config.prefix
  })
  controllerList.forEach((Controller) => {
    const controller = new Controller();
    router.use(controller.router.routes(), controller.router.allowedMethods())
  })
  app.use(router.routes())
}

module.exports = initController