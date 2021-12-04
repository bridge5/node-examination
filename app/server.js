const Koa = require('koa')
const app = new Koa()
const compose = require('koa-compose')
const md = require('./src/middlewares')
const mongoose = require('mongoose')
const config = require('./src/configs/config')


mongoose.connect(config.mongodb, function (error) {
  if (error) {
    console.log(error)
  } else {
    console.log('mongoose 连接成功')
  }
})

app.use(compose(md))

app.on('error', (err, ctx) => {
  if (ctx) {
    ctx.body = {
      code: 404,
      message: `程序运行时报错：${err.message}`
    };
  }
})

module.exports = app
