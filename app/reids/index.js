var redis = require('redis');
var client = redis.createClient(6379, '122.51.124.76');
client.auth('yuan123'); // 如果没有设置密码 是不需要这一步的

client.on('error', err => {
        console.log('redis启动失败!')
    })
    //获取键值对
function getkey(key) {
    const promise = new Promise((resolve, reject) => {
        client.get(key, (err, val) => {
            if (err) {
                reject(err)
            }
            if (val === null) {
                resolve(null)
            }
            try {
                resolve(
                    JSON.parse(val)
                )
            } catch (ex) {
                resolve(val)
            }
        })
    })
    return promise

}
//设置redis 键值对
function setkey(key, val) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    client.set(key, val, redis.print)
    client.expire(key, 3600); //一小时后自动过期
}

module.exports = {
    getkey,
    setkey
}