'use strict';

const express = require('express');
const app = express();
const utils = require('./lib/utils');
const enums = require('./lib/enum');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// TODO 请求错误日志处理
app.use('*', function(req, res, next){
    // req.logId = ; // 生成请求日志id
    console.log('');
    next();
});

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
