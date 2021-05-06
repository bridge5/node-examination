const validateSchema = {
    createDate: {
        type: Date,
        required: String,
        message: {
            required: '请选择时间'
        }
    },//创建时间
    name: {
        type: String,
        required: true
    },//姓名
    age: {
        type: Number,
        required: true
    },//年龄
    sex: { // 性别 1男 2女
        type: Number,
        enum: [1, 2]
    },
    description: {
        type: String
    },//描述
}

module.exports = {

    async addPlayer(ctx) {
        let body = ctx.request.body;
        let obj = ctx.$utils.validate(validateSchema, body)
        if (obj.err) {
            ctx.$json(ctx, 'error', obj)
            return false
        }
        await ctx.$playerService.create(body)
        ctx.$json(ctx, 'success', '创建成功')
    },

    async deletePlayer(ctx) {
        let id = ctx.params.id;
        let arr = await ctx.$playerService.find({id})
        if (!arr.length) {
            ctx.$json(ctx, 'error', 'id错误')
            return false
        }
        await ctx.$playerService.deleteOne({id});
        ctx.$json(ctx, 'success', '删除成功')
    },

    async getPlayerById(ctx) {
        let id = ctx.params.id;
        let arr = await ctx.$playerService.find({id})
        ctx.$json(ctx, 'success', arr[0])
    },

    async updatePlayer(ctx) {
        let id = ctx.params.id;
        let body = ctx.request.body;
        let obj = ctx.$utils.validate(validateSchema, body)
        if (obj.err) {
            ctx.$json(ctx, 'error', obj)
            return false
        }
        await ctx.$playerService.updateOne({id}, body)
        ctx.$json(ctx, 'success')
    },

    async list(ctx) {
        let query = ctx.request.query;
        let data = await ctx.$playerService.pageQuery(query)
        ctx.$json(ctx, 'success', data)
    },


}
