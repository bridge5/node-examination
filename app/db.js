'use strict';

const mongoose = require('mongoose');
const config = require('config-lite');
const db = mongoose.connection;

mongoose.connect(config.mongodburl, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

db.once('open', () => {
  console.log("数据库连接成功")
})

db.on('error', function (error) {
  console.error("数据库异常关闭");
  mongoose.disconnect();
});

db.on('close', function () {
  console.log("断开重连")
  mongoose.connect(config.mongodburl, { server: { auto_reconnect: true } });
});
