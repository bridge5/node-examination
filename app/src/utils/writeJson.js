/*
* 返回数据格式错误
* */
module.exports = (ctx, type, data ) => {
    ctx.type = 'json'
    let obj = {
        noLogin: {
            msg: '未登录',
            err: 2
        },
        invalid: {
            msg: '登录失效',
            err: 3
        },
        error: {
            msg: '一般错误',
            err: 1
        },
        success: {
            msg: '成功',
            err: 0
        }
    }

    ctx.body = {...obj[type], data}
}
