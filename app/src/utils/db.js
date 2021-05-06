const mongoose = require('mongoose');
const path = require('path');

const uri = 'mongodb://localhost/test';
const connection = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 4
});

//返回mongo temp
const temp = (model) => {
    let filepath = path.join(__dirname, './../model/' + model);
    let schema = require(filepath);
    //集合名称与model同名
    return connection.model(model, schema, model);
};


//查询数据格式处理
const queryDeal = (where) => {
    var obj = {}
    for (let w in where) {
        let value = ''
        try {
            value = JSON.parse(where[w])
        } catch (e) {
            value = where[w]
        }
        //如果为数组
        if (Array.isArray(value) && value.length) {
            var arr = [];
            for (let i in value) {
                arr.push(value[i])
            }
            if (w === '$or' && obj.$or) {
                obj.$or = obj.$or.concat(arr)
            } else {
                obj.$or = arr
            }
        } else {
            //非数组
            obj[w] = w === '_id' ? mongoose.Types.ObjectId(value) : value
        }
    }
    return obj
}

module.exports = {
    //新增文档 create
    create(model, obj) {
        return new Promise((resolve, reject) => {
            temp(model).create(obj, function (err, dos) {
                if (err) {
                    reject('数据插入失败')
                } else {
                    resolve(dos)
                }
            })
        })
    },
    //新增文档 insertMany
    insertMany(model, arr) {
        return new Promise((resolve, reject) => {
            temp(model).insertMany(arr, function (err, dos) {
                if (err) {
                    reject('数据插入失败')
                } else {
                    resolve(dos)
                }
            })
        })
    },

    //查找文档
    find(model, where = {}, sort = {date: -1}, select = {_id: 0, __v: 0}) {
        return new Promise((resolve, reject) => {
            where = queryDeal(where)
            let cursor = temp(model).find(where).sort(sort).select(select);
            cursor.exec(function (err, arr) {
                if (err) {
                    reject('查询失败')
                } else {
                    resolve(arr)
                }
            })
        })
    },

    //分页查询
    findPage(model, where = {}, page = 1, sort = {date: -1}, select = {_id: 0, __v: 0}, pageNum = 10) {
        return new Promise((resolve, reject) => {
            where = queryDeal(where)
            let cursor = temp(model).find(where).sort(sort).select(select).skip((page - 1) * pageNum).limit(pageNum);
            cursor.exec(function (err, arr) {
                if (err) {
                    reject('查询失败')
                } else {
                    resolve(arr)
                }
            })
        })
    },

    //查询集合数量
    count(model, where = {}) {
        return new Promise((resolve, reject) => {
            where = queryDeal(where)
            temp(model).find(where).countDocuments(function (err, count) {
                if (err) {
                    reject('查询失败')
                } else {
                    resolve(count)
                }
            })
        })
    },

    //分页查询
    async pageQuery({model, where = {}, page = 1, sort = {date: -1}, select = {_id: 0, __v: 0}, pageSize = 10}) {
        let arr = await this.findPage(model, where, page, sort, select, pageSize)
        let total = await this.count(model, where);
        let pages = Math.ceil(total / pageSize);
        return {
            curPage: page,
            pages,
            pageSize,
            total,
            arr
        }
    },

    //更新多条数据
    update(model, where, setData) {
        return new Promise((resolve, reject) => {
            /*
            * 返回 raw 对象 { ok: 1, nModified: 0, n: 1 }
            * ok状态1：成功，其他不成功，nModified 修改的条数，n找到的条数
            * */
            temp(model).updateMany(where, setData, function (err, raw) {
                if (err) {
                    reject('更新失败')
                } else {
                    if (raw.ok === 1 && raw.nModified >= 1 && raw.n >= 1) {
                        resolve('更新成功')
                    } else if (raw.nModified === 0 && raw.n >= 1 && raw.ok === 1) {
                        reject('内容未做修改，更新失败')
                    } else {
                        reject('更新失败')
                    }
                }
            })
        })
    },

    //更新一条数据
    updateOne(model, where, setData) {
        return new Promise((resolve, reject) => {
            /*
           * 返回 raw 对象 { ok: 1, nModified: 0, n: 1 }
           * ok状态1：成功，其他不成功，nModified 修改的条数，n找到的条数
           * */
            temp(model).updateOne(where, setData, function (err, raw) {
                if (err) {
                    reject('更新失败')
                } else {
                    if (raw.ok === 1 && raw.nModified >= 1 && raw.n >= 1) {
                        resolve('更新成功')
                    } else if (raw.nModified === 0 && raw.n >= 1 && raw.ok === 1) {
                        reject('内容未做修改，更新失败')
                    } else {
                        reject('更新失败')
                    }
                }
            })
        })
    },

    //删除文档
    deleteMany(model, where) {
        return new Promise((resolve, reject) => {
            temp(model).deleteMany(where, function (err, doc) {
                if (err) {
                    reject('删除失败')
                } else {
                    resolve(doc)
                }
            })
        })
    },

    deleteOne(model, where) {
        return new Promise((resolve, reject) => {
            temp(model).deleteOne(where, function (err, doc) {
                if (err) {
                    reject('删除失败')
                } else {
                    resolve(doc)
                }
            })
        })
    },

    //聚合管道查询
    aggregate(model, arr) {
        return new Promise((resolve, reject) => {
            temp(model).aggregate(arr).exec(where, function (err, doc) {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
        })
    }
}

