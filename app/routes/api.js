'use strict'

const express = require('express');
const api = express.Router()
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// 设置数据库对象结构
const UserDB = mongoose.model("user", new Schema({
    username:{type:String, default:""},
    /**创建时间 */
    create_time: { type: String, default: "" },
    /**其他备用数据 */
    other_item: Object,
    enabled: { type: Boolean, default: true },
}))

// 获取单表列表
const getSchemaList = async (query, pageNo = 1, pageSize = 10, sort = "create_time") => {
    let temp = query.model
    let tempQuery = query.getQuery() 
    let count = await query.count() || 0;
    let list = (+pageSize != -1 ? await temp.find(tempQuery).skip((+pageNo - 1) * +pageSize).limit(+pageSize).sort({[sort]:-1}).lean() : await temp.find(tempQuery).sort({[sort]:-1}).lean()) || []
    let total = ~~(count / pageSize) || 1

    if (1 < total % pageSize ){
        total = total + 1;
    }
    return {
        count, total, pageNo, nextPage:pageNo >= total ? total : pageNo + 1, pageSize, list
    }
}

// 向客户端发送JSON数据
const sendResponseBody = (res, message = "OK", code = 100, data = {}, state = 200) => {
  res.status(state).send({
    code, message, data
  });
}

// 增
api.post("/user", async (req, res, next) => {
    let {username = ""} = req.body;
    if(username == ""){
        sendResponseBody(res, "用户名不能为空", -1);
        return ;
    }
    await UserDB.create({ username, create_time:new Date().toLocaleString() })
    sendResponseBody(res);
})
// 删
api.delete("/user", async (req, res, next) => {
    let {id} = req.body;
    let user = await UserDB.findById(id).lean();
    if(user){
        await UserDB.findByIdAndRemove(id);
        sendResponseBody(res, "删除成功");
        return;
    }
    sendResponseBody(res, "找不到用户", -2);
})
// 改
api.put("/user", async (req, res, next) => {
    let {id = "", username = ""} = req.body;
    if(username == ""){
        sendResponseBody(res, "用户名不能空！", -1);
        return;
    }
    // 获取 userdb 纯数据对象
    let user = await UserDB.findById(id).lean();
    if(user){
        await UserDB.findByIdAndUpdate(id, { username });
        sendResponseBody(res, "修改成功");
        return ;
    }
    sendResponseBody(res, "找不到用户", -2)
})
// 查
api.get("/user", async (req, res, next) => {
    let {pageNo = 1, pageSize = 10} = req.query;
    let userList = await getSchemaList(UserDB.find(), pageNo, pageSize);
    sendResponseBody(res, 100, "OK", userList);
})

module.exports = api

