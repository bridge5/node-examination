const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/wuqiao', {
        useNewUrlParser: true
    })
    .then(
        () => {
            console.log('数据库连接成功')
        },
        err => {
            console.log(`数据库连接失败${err}`)
        }
    )
module.exports = mongoose