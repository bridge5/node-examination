'use strict';

const express = require('express');
const app = express();
const utils = require('./lib/utils');
const enums = require('./lib/enum');
const router = require('./lib/router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO 请求错误日志处理
app.use('*', function(req, res, next){
    // req.logId = ; // 生成请求日志id
    console.log('');
    next();
});

// 跨域处理
app.all('*', function (req, res, next) {
    const origin = req.headers.origin;
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,PATCH,OPTIONS');
    res.header('X-Powered-By', ' 3.2.1');
    res.header('Content-Type', 'application/json;charset=utf-8');

    next();
});

// 路由配置
app.use(router);

// 404请求处理
app.use(function(req, res, next) {
    return res.json(utils.resJson(enums.Code.NOT_FOUND, 'Not Found', {})); 
});

// 错误处理
app.use(function(err, req, res, next) {
    res.status(err.status || 500);

    return res.json(utils.resJson(enums.Code.FAIL, '内部错误', {}));
});

module.exports = app;
