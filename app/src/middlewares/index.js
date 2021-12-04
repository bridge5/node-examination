/*
 * @Description:中间件
 */
const bodyparser = require('koa-bodyparser')
const router = require('../routes')
const logger = require('koa-logger')

//格式化参数
const mdBodyParser = bodyparser({
  enableTypes: ['json', 'form', 'text', 'xml'],
  formLimit: '56kb',
  jsonLimit: '1mb',
  textLimit: '1mb',
  xmlLimit: '1mb',
  strict: true
})

// 处理路由
const mdRouterRoutes = router.routes()
const mdRouterAllowed = router.allowedMethods()

// 打印日志
const mdLog = logger()

module.exports = [
  mdBodyParser,
  mdLog,
  mdRouterRoutes,
  mdRouterAllowed
]
