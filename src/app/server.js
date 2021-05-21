const {name: appName} = require('../package.json');
const config          = require('../config');

let logger        = require('./libs/logger'); /* eslint-disable-line no-unused-vars */
let Koa           = require('koa');

let app  = new Koa();
//app.proxy = config.env!=='dev';
app.keys = [appName];

app.on('error', function (err) {
  console.error('koa server error: %s', err);
});

if (config.env !== 'production') {
  //show error stack in dev env
  app.use(async function (ctx, next) {
    try {
      await next();
    } catch (err) {
      ctx.response.body = err.stack;
    }
  });
}
app.use(require('./middlewares/morgan'));
app.use(require('koa-helmet')({}));
app.use(require('koa-bodyparser')({}));
app.use(require('./controllers/index'));

module.exports = app;
