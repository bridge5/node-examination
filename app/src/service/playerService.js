const db = require('./../utils/db')
const model = 'player'
module.exports = {
    async create(data) {
        data.date = Date.now();
        data.status = 0;
        return await db.create(model, data)
    },

    async updateOne(where, data) {
        data.status = 0;
        return await db.updateOne(model, where, data)
    },

    async deleteOne(where) {
        return await db.deleteOne(model, where)
    },

    async find(where) {
        return await db.find(model, where)
    },

    async pageQuery({page = 1, pageSize = 10, regStr = '', sort = '', endTime = '', startTime = ''}) {
        let where = {};
        if (startTime && endTime) {
            where.createDate = {$lte: parseInt(endTime), $gte: parseInt(startTime)}
        }
        if (regStr) {
            let $regex = new RegExp(regStr, 'gi');
            where.$or = [
                {name: {$regex}},
                {description: {$regex}},
            ];
        }
        if (sort) {
            try {
                sort = JSON.parse(sort)
            } catch (e) {
                sort = {createDate: -1}
            }
        }
        return await db.pageQuery({model, pageSize, page, where})

    }

}
