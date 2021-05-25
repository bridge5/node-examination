/**
 * File: mongoClient.js
 * Project: node-examination
 * FilePath: /middleware/mongoClient.js
 * Created Date: 2021-05-24 15:50:46
 * Author: SaltFish l1218838196@gmail.com
 * -----
 * Last Modified: 2021-05-24 23:12:28
 * Modified By: SaltFish
 * -----
 * Description:
 */

const { Mongoose } = require("mongoose");
const koa = require('koa');
const config = require('../config');
const autoIncrement = require('mongoose-auto-increment')

const resources = require('../resources')

const mongoClient = new Mongoose();

/**
 * 
 * @param {koa.Context} ctx 
 * @param {koa.Next} next 
 */
const initModels = async (ctx, next) => {
  try {
    await mongoClient.connect(config.mongoDb.url, config.mongoDb.option);
    autoIncrement.initialize(mongoClient.connection)
    mongoClient.plugin(autoIncrement.plugin, 'Player')
    const models = {}
    resources.forEach(({ name, schema }) => {
      models[name] = mongoClient.model(name, schema)
      if (name === 'Player') {
        
      }
    })
    ctx.models = models;
  } catch (error) {
    throw error
  }
  await next();
}

module.exports = initModels