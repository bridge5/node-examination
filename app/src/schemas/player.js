/*
 * @Description:player参数验证模型
 */
const Joi = require('joi');

const createBody = {
  schema: Joi.object({
    name: Joi.string().required(),
    position: Joi.string().required()
  }),
  type: 'body'
}

const updateBody = {
  schema: Joi.object({
    name: Joi.string(),
    position: Joi.string()
  }),
  type: 'body'
}


module.exports = {
  createBody,
  updateBody,
}
