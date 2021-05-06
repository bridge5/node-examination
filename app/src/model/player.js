const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    date: Date,//记录时间
    createDate: Date,//创建时间
    name: String,//姓名
    age: Number,//年龄
    sex: { // 性别 1男 2女
        type: Number,
        enum: [1, 2]
    },
    description: String,//描述
    status: { //审核状态 0未审核 1审核
        type: Number,
        enum: [0, 1]
    }
})
