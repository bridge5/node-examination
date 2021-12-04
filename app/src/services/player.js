/*
 * @Description:playerService
 */
const Player = require('../models/player')


/**
 * 创建
 * @param {Obj} body 
 * @returns 
 */
async function createOne(body) {
  const result = await Player.create(body)
  return result
}

/**
 * 查看列表
 * @param {Obj} query 
 * @returns 
 */
async function getList(query) {
  const result = await Player.find(query)
  return result
}

/**
 * 获取详细信息
 * @param {ObjectId} id 
 * @returns 
 */
async function getDetail(id) {
  const result = await Player.findById(id)
  return result
}

/**
 * 更新单个
 * @param {ObjectId} id 
 * @param {Obj} body 
 * @returns 
 */
async function updateOne(id, body) {
  const result = await Player.findByIdAndUpdate(id, body)
  return result
}

/**
 * 删除单个
 * @param {ObjectId}} id 
 * @returns 
 */
async function deleteOne(id) {
  const result = await Player.findByIdAndRemove(id)
  return result
}

module.exports = {
  createOne,
  getList,
  getDetail,
  updateOne,
  deleteOne
}
