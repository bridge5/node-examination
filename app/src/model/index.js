const Sequelize = require('sequelize');
const Player = require('./player');

module.exports = class DB {
    constructor({host, database, username, password}) {
        this.sequelize = new Sequelize(database, username, password, {
            host: host,
            dialect: 'mysql',
            logging:false,
        });
        this.player = Player(this.sequelize);
    }
}