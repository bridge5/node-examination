/*
 * @Description: playerController
 */

const playerService = require('../services/player')

/**
 * 创建
 * @param {ctx} ctx 
 */
const create = async ctx => {
  try {
    await playerService.createOne(ctx.request.body)
    ctx.body = {
      code: 201,
      message: '创建成功'
    }
  } catch (error) {
    if (error) {
      ctx.body = {
        code: 400,
        message: '创建失败，信息错误'
      }
    }
  }
}

/**
 * 获取列表
 * @param {ctx} ctx 
 */
const list = async ctx => {
  try {
    const result = await playerService.getList(ctx.request.query)
    ctx.body = {
      code: 200,
      data: result,
      message: '列表获取成功'
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      message: '列表获取失败'
    }
  }
}

/**
 * 获取详情
 * @param {ctx} ctx 
 */
const detail = async ctx => {
  try {
    const result = await playerService.getDetail(ctx.request.params.id)
    ctx.body = {
      code: 200,
      data: result,
      message: '详情获取成功'
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      message: '详情获取失败'
    }
  }
}

/**
 * 更新
 * @param {ctx} ctx 
 */
const update = async ctx => {
  try {
    await playerService.updateOne(ctx.request.params.id, ctx.request.body)
    ctx.body = {
      code: 200,
      message: '更新成功'
    }
  } catch (error) {
    console.log(error)
    ctx.body = {
      code: 500,
      message: '更新失败'
    }
  }
}

/**
 * 删除
 * @param {ctx} ctx 
 */
const del = async ctx => {
  try {
    await playerService.deleteOne(ctx.request.params.id)
    ctx.body = {
      code: 200,
      message: '删除成功'
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      message: '删除失败'
    }
  }
}

module.exports = {
  create,
  list,
  detail,
  update,
  del
}
