/*
 * @Description:配置文件
 */

const env = require('../utils/env')

/**
 * 通用配置
 */
let common = {
  port: '3000',
  mongodb: 'mongodb://127.0.0.1:27017/demo0'
}

/**
 * 测试配置
 */
let dev = {
  mongodb: 'mongodb://119.29.94.22:27017/demo'
}

/**
 * 生产配置
 */
let prd = {
  mongodb: 'mongodb://119.29.94.22:27017/demo'
}

const config = env.isPrd ? Object.assign(common, prd) : Object.assign(common, dev)

module.exports = config
