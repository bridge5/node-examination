const path = require('path');
const logger = require(path.join(__dirname, '../../utils/logger'));

if (process.env.NODE_ENV === 'production') {
    logger.info('连接正式数据库中……');
    module.exports = {
        mongodb: 'mongodb://127.0.0.1:27017/player_prod'
    };
} else {
    logger.info('连接开发数据库中……');
    module.exports = {
        mongodb: 'mongodb://127.0.0.1:27017/player_dev'
    };
}
