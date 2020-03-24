const Koa = require('koa')
const logger = require('koa-morgan')
const router = require('./router')
const koaBody = require('koa-body')

const app = new Koa()

app
.use(logger('":method :url" :status :res[content-length] ":referrer" ":user-agent"'))
.use(koaBody())
.use(router.routes())

app.listen(3003, () => {
    console.log("Server is listening on port 3003");
})

module.exports = app
