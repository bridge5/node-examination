var players = require('../models/players.js');
// 同步表结构
players.sync({
    force: false // true 强制同步，先删除表，然后新建
});