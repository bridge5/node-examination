'use strict';
const Koa = require('koa');
const cros = require('koa2-cors');
const route = require('./src/route');
const koaBody = require('koa-body');
const validate = require('koa-parameter');
const Mysql = require('./src/model/index');
// eslint-disable-next-line no-undef
const env = process.env.NODE_ENV;
const config = require('./src/config/' + env +  '.config');
const app = new Koa();
const DB = new Mysql(config.db);
app.context.db = DB;
app.use(cros());
app.use(koaBody());
app.use(validate(app))
route(app);
app.listen('3030',() => {
  console.log("listen on 3030");
});
module.exports = app;