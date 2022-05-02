const mongoose = require('mongoose')
/*
* 用户表
* */
module.exports = new mongoose.Schema({
    createDate: Date,//创建时间
    account: String,//账号
    password: String,//密码
    token: String,//登录token
    description: String,//描述
    status: { //审核状态 0未审核 1审核
        type: Number,
        enum: [0, 1]
    }
})
