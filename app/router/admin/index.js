const express = require("express");
const router = express.Router();
const players = require('../../models/players.js');
var config = require('../../config/sqlconfig.js');
var jwt = require('../../config/jwtconfig');
const { Op } = require("sequelize");

//创建
router.post("/player", function(req, res) {

    if (!req.body.name) {
        res.send({ message: '请输入name!' });
    }
    if (!req.body.position) {
        res.send({ message: '请输入position!' });
    }
    save(); //执行保存
    async function save() {
        try {
            var result = await players.create({
                name: req.body.name,
                password: '123', //用于登录。在此处加一个默认密码。
                position: req.body.position
            });
            res.send(result);
        } catch (err) {
            res.send(err); //返回保存失败信息
        }
    }
});
//编辑
router.put("/player", function(req, res) {

    if (!req.body.name) {
        res.send({ message: '请输入name!' });
    }
    if (!req.body.position) {
        res.send({ message: '请输入position!' });
    }
    if (req.body.id > 0) {
        update();
        async function update() {
            try {
                var result = await players.update({
                    name: req.body.name,
                    position: req.body.position
                }, {
                    where: {
                        id: req.body.id
                    }
                });
                if (result == 1) {
                    res.send({ message: '修改成功!' });
                } else {
                    res.send({ message: '修改失败!' });
                }
                res.send(result)
            } catch (err) {
                res.send(err)
            }
        }

    } else {
        res.status(400);
        res.send({ message: 'id不合法!' });
    }
});

//查询
router.get("/player", function(req, res) {

    if (req.query.playerId) {
        //squlize 使用原生sql拼接用法
        let user = config.query('select * from players where id =:id', //offset ${(req.query.pageIndex*req.query.pageSize)} limit ${req.query.pageSize} 分页
                {
                    model: players, //数据承接模型
                    mapToModel: true,
                    replacements: { id: req.query.playerId },
                    type: config.QueryTypes.SELECT
                })
            .then(result => {
                res.status(200);
                res.send(result); //将查询的结果返回 
            })
    } else {
        res.status(400);
        res.send({ message: 'id不合法!' });
    }
});
//删除
router.delete("/player", function(req, res) {

    if (req.query.playerId > 0) {
        deleteuser();
        async function deleteuser() {
            try {
                var result = await players.destroy({
                    where: {
                        id: req.query.playerId
                    }
                });
                if (result == 1) {
                    res.send({ message: '删除成功!' });
                } else {
                    res.send({ message: '删除失败!' });
                }
            } catch (err) {
                res.send(err);
            }
        }
    } else {
        res.status(400);
        res.send({ message: 'id不合法!' });
    }
});

//获取token
router.post("/login", function(req, res) {

    if (!req.query.name) {
        res.send({ message: '请输入账号!' });
    }
    if (!req.query.password) {
        res.send({ message: '请输入密码!' });
    }
    login();
    async function login() {
        var result = await players.findOne({
            where: {
                name: req.query.name,
                password: req.query.password
            }
        });

        if (result && result.id > 0) {

            res.send({
                status: "ok",
                statuscode: '200',
                token: jwt.createToken({ id: result.id, name: req.query.name, password: req.query.password }), //生成一个token
                userinfo: {
                    name: result.name,
                    phone: result.phone,
                    age: result.age,
                    createAt: result.createAt
                }
            });

        } else {
            res.send({ message: '账号或密码错误!' });
        }
    }

});




module.exports = router;