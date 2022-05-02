const Koa = require('koa');
const app = new Koa();
const path = require('path');
//压缩
let compress = require('koa-compress');

app.use(compress({
    filter: function (content_type) {
        return /text/i.test(content_type)
    },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
}));


const session = require('koa-session2');
const Store = require('./src/utils/redisStore');
const config = {
    redis: {
        port: 6379,
        host: 'localhost',
        family: 4,
        // password: '123456',
        db: 0
    },
};
app.use(session({
    store: new Store(config.redis),
    maxAge: 12 * 60 * 60 * 1000,//有效时间
}));

//静态资源
const serve = require('koa-static');
let Static = path.join(__dirname, 'static');
app.use(serve(Static));


//图片上传
let koaBody = require('koa-body'); //解析上传文件的插件
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 50 * 1024 * 1024,// 设置上传文件大小最大限制，默认50M
        multipart: true, // 是否支持多文件上传  encoding:'utf-8',
        uploadDir: path.join(__dirname, './static/images'),//文件上传的文件夹
        keepExtensions: true,    // 保持文件的后缀
    },
    stict: false,//严格模式,启用后不会解析 GET, HEAD, DELETE 请求 默认值 true
}));

//插件
const utils = require('./src/utils');
//配置文件，挂在挂载在ctx
app.context.$config = require('./config');
app.context.$utils = utils;
app.context.$json = require('./src/utils/writeJson')
//挂载服务
utils.setMiddlewareName(app, path.join(__dirname, './src/service'))

//错误事件监听
app.on('error', (err, ctx) => {
    let path = ctx.path;
    console.log(path, err);
    ctx.response.type = 'html';
    // ctx.response.status=500;
    ctx.response.body = {
        err: 4,
        msg: err.message
    }
});


module.exports = app;
