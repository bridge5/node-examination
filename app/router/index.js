const express = require("express");
const router = express.Router();
const admin = require("./admin/index"); //导入模块化路由
const jwt = require("../config/jwtconfig"); //导入jwt验证
//相当于后台的路由，所有的后台处理都需要从这里经过
router.use(function(req, res, next) {


    //【放开则会校验token】 
    // if (req.path != '/admin/login') { //个别接口不需要token验证都可访问。例：登录，获取验证码...等
    //     //jwt token验证
    //     jwt.checkToken(req.headers.token).then(res => {
    //         next();
    //     }).catch(err => {
    //         res.send({
    //             status: "ok",
    //             statuscode: '403', //token校验失败的code
    //             message: err
    //         });
    //     })

    // } else {
    //     next();
    // }

    next();
});

//加载 模块化路由 【admin】 即带有admin前缀的请求
router.use("/", admin);
module.exports = router;