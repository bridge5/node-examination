var Sequelize = require('sequelize');
var config = require('../config/sqlconfig.js');

var players = config.define('player', {
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(100), // 姓名
    position: Sequelize.STRING(10),
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    password: Sequelize.STRING(22), //密码
}, {
    timestamps: false // 不要默认时间戳
});

module.exports = players;