const mongoose = require('mongoose');
const config = require('./config');
const path = require('path');
const logger = require(path.join(__dirname, '../../utils/logger'));

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

module.exports = () => {
    mongoose.connect(config.mongodb, {useNewUrlParser: true, autoIndex: false});//连接mongodb数据库

    let db = mongoose.connection;

    db.on('error', (err) => {
        logger.error('连接数据库失败!! ' + err);
    });
    db.once('open', async () => {

        logger.info('连接数据库成功!');
    });
    return db;
};
