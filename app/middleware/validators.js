/**
 * File: validators.js
 * Project: node-examination
 * FilePath: /middleware/validators.js
 * Created Date: 2021-05-24 16:43:21
 * Author: SaltFish l1218838196@gmail.com
 * -----
 * Last Modified: 2021-05-24 23:14:37
 * Modified By: SaltFish
 * -----
 * Description:
 */

const resources = require('../resources');
const koa = require('koa')
/**
 * 
 * @param {koa.Context} ctx 
 * @param {koa.Next} next 
 */
const initValidators = (ctx, next) => {
  try {
    const validators = {}
    resources.forEach(({ name, validator }) => {
      validators[name] = validator
    })
    ctx.validators = validators;
  } catch (error) {
    throw error
  }
  return next();
}

module.exports = initValidators
