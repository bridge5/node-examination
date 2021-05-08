var Sequelize = require('sequelize');
//初始化链接（支持连接池）
var sequelize = new Sequelize('yuan', 'yuan', 'Yh5KY7dWAD8LaSa8', {
    host: '122.51.124.76',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});
module.exports = sequelize;