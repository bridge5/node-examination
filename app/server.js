const express = require('express');
//jwt 验证
//数据库配置
const sqlconfig = require("./config/sqlconfig");
//
const mgdbconfig = require("./config/mgdbconfig");
//表结构同步
const tables = require("./config/syncTable");
//引入route模块
const route = require("./router/index");
var cors = require('cors')
const app = express();
//body内容json序列化
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());


//express + mysql + redis 的node Api构建 【mongodb配置，第一次用mongodb.不太了解。就没实际应用。】
try {
    //设置跨域访问
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", ' 3.2.1');
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
    });

    app.use("/", route); //加载接口路由
    //配置服务端口
    var server = app.listen(3000, function() {
        var host = server.address().address;
        var port = server.address().port;
        console.log('启动端口:', host, port);

    })
} catch (err) {
    console.log(err)
    console.log('初始化失败！');
}