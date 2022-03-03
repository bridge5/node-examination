'use strict';
const Controller = require('egg').Controller;

class PlayerController extends Controller {


    async test() {
        let params = {
            "name": "klkkkk",
            "playerId": 1,
            "position": "C"
        }
        let exsit = await this.ctx.service.player.findOne(params.playerId)
        if (!exsit) {
            exsit = await this.ctx.service.player.create(params)
        }
        console.log(exsit, '---数据库结果')

        params.name = 'updateKkkkk'
        params.position = 'B'
        let updateRes = await this.ctx.service.player.update(params)

        console.log(updateRes, '---修改结果')

        let delRes = await this.ctx.service.player.del(params.playerId)

        console.log(delRes, '---删除结果')
    }

    async create() {
        try {
            let params = this.ctx.form.create.checkData({
                ...this.ctx.request.body
            })
            let res = await this.ctx.service.player.create(params)
            return this.ctx.body = this.ctx.out.success(res)
        } catch (err) {
            return this.ctx.body = this.ctx.out.error(err.code, err.message);
        }
    }

    async update() {
        try {
            let params = this.ctx.form.create.checkData({
                ...this.ctx.request.body
            })
            let res = await this.ctx.service.player.update(params)
            return this.ctx.body = this.ctx.out.success(res)
        } catch (err) {
            return this.ctx.body = this.ctx.out.error(err.code, err.message);
        }
    }

    async findOne() {
        try {
            let urlArr = this.ctx.request.url.split('/')
            let params = this.ctx.form.findOne.checkData({
                ...this.ctx.request.query,
                playerId: parseInt(urlArr[urlArr.length - 1])
            })
            let res = await this.ctx.service.player.findOne(params.playerId)
            return this.ctx.body = this.ctx.out.success(res)
        } catch (err) {
            return this.ctx.body = this.ctx.out.error(err.code, err.message);
        }
    }


    async del() {
        try {
            let urlArr = this.ctx.request.url.split('/')
            let params = this.ctx.form.findOne.checkData({
                ...this.ctx.request.query,
                playerId: parseInt(urlArr[urlArr.length - 1])
            })
            let res = await this.ctx.service.player.del(params.playerId)
            return this.ctx.body = this.ctx.out.success(res)
        } catch (err) {
            return this.ctx.body = this.ctx.out.error(err.code, err.message);
        }
    }

}

module.exports = PlayerController;