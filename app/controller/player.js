/**
 * File: player.js
 * Project: node-examination
 * FilePath: /controller/player.js
 * Created Date: 2021-05-24 18:22:05
 * Author: SaltFish l1218838196@gmail.com
 * -----
 * Last Modified: 2021-05-25 16:29:55
 * Modified By: SaltFish
 * -----
 * Description:
 */

const Router = require('koa-router');
const name = 'Player';

class PlayerController {
  constructor() {
    this.name = 'Player';
    this.router = new Router({
      prefix: '/player'
    });
    this.initRouters()
  }

  initRouters = () => {
    this.router.post('/', this.create)
    this.router.put('/:playerId', this.updateById)
    this.router.get('/:playerId', this.findById)
    this.router.delete('/:playerId', this.deleteById)
  }
  /**
   * 
   * @param {Router.IRouterContext} ctx 
   * @param {string[]} requiredParams
   * @param {object} values
   */
  validator = (ctx, requiredParams = [], values = {}) => {
    const resouceValidator = ctx.validators[this.name];
    if (ctx.params[`${this.name.toLowerCase()}Id`]) {
      try {
        resouceValidator['id'](parseInt(ctx.params.playerId))
      } catch (error) {
        ctx.body = error.message
        ctx.status = 400;
        return false
      }
    }

    // 检查必传参数
    for (let i = 0; i < requiredParams.length; i++) {
      const paramName = requiredParams[i];
      if (typeof values[paramName] === 'undefined') {
        ctx.body = `${paramName} is required!`
        ctx.status = 405;
        return false
      }
    }

    for (const key in values) {
      if (Object.hasOwnProperty.call(values, key)) {
        if (!Object.hasOwnProperty.call(resouceValidator, key)) {
          ctx.body = `${key} is not in schema`
          ctx.status = 405
          return false
        }
        const element = values[key];
        try {
          if (element) {
            resouceValidator[key](element)
          }
        } catch (error) {
          console.log(error)
          ctx.body = `error params '${key}': ${error.message}`
          ctx.status = 405
          return false
        }
      }
    }

    return true
  }

  dbDataTrans = (dbData) => {
    if (dbData.toObject) {
      dbData = dbData.toObject()
    }
    const { _id } = dbData;
    delete dbData._id
    delete dbData.__v
    dbData.id = _id
    return dbData
  }
  /**
   * 
   * @param {Router.IRouterContext} ctx 
   * @param {number} id 
   */
  existBrforeAction = async (ctx, id) => {
    const model = ctx.models[this.name];
    const exist = await model.findById(id).exec();
    if (exist) {
      return exist
    }
    return null
  }

  /**
   * 
   * @param {Router.IRouterContext} ctx 
   */
  create = async (ctx) => {
    const body = ctx.request.body
    const model = ctx.models[this.name]
    const passVerification = this.validator(ctx, ['name'], {
      ...body
    })

    if (!passVerification) {
      return
    }
    try {
      if (body.id) {
        const exist = await this.existBrforeAction(ctx, body.id)

        if (exist) {
          ctx.status = 412;
          ctx.body = `Id ${body.id} already exist!`
          return;
        }
        body._id = body.id
      }
      const result = await model.create({
        ...body
      })
      ctx.status = 200;
      ctx.body = this.dbDataTrans(result)
    } catch (error) {
      console.error(error)
      ctx.throw(error)
    }
  }

  /**
   * 
   * @param {Router.IRouterContext} ctx 
   */
  findById = async (ctx) => {
    const passVerification = this.validator(ctx);

    if (!passVerification) {
      return;
    };
    const { playerId } = ctx.params
    const id = parseInt(playerId)
    try {
      const exist = await this.existBrforeAction(ctx, id)
      if (!exist) {
        ctx.status = 404;
        ctx.body = `Id ${id} not exist!`
        return;
      }
      ctx.status = 200;
      ctx.body = this.dbDataTrans(exist)
    } catch (error) {
      console.error(error)
      ctx.throw(error)
    }
  }

  /**
  * 
  * @param {Router.IRouterContext} ctx 
  */
  updateById = async (ctx) => {
    const passVerification = this.validator(ctx, [], {
      ...ctx.request.body
    });

    if (!passVerification) {
      return;
    };
    const { playerId } = ctx.params
    const id = parseInt(playerId)
    try {
      const exist = await this.existBrforeAction(ctx, id)
      if (!exist) {
        ctx.status = 404;
        ctx.body = `Id ${id} not exist!`
        return;
      }
      await exist.set({
        ...ctx.request.body
      }).save()
      ctx.status = 200;
      ctx.body = this.dbDataTrans(exist)
    } catch (error) {
      console.error(error)
      ctx.throw(error)
    }
  }

  /**
   * 
   * @param {Router.IRouterContext} ctx 
   */
  deleteById = async (ctx) => {
    const passVerification = this.validator(ctx);
    if (!passVerification) {
      return;
    };
    const { playerId } = ctx.params
    const id = parseInt(playerId)
    try {
      const exist = await this.existBrforeAction(ctx, id)
      if (!exist) {
        ctx.status = 404;
        ctx.body = `Id ${id} not exist!`
        return;
      }
      await exist.remove()
      ctx.status = 200;
      ctx.body = this.dbDataTrans(exist)
    } catch (error) {
      console.error(error)
      ctx.throw(error)
    }
  }
}

module.exports = PlayerController