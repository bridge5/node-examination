'use strict';

const config = require('config');
const Thenjs = require('thenjs');
const MongoClient = require('mongodb').MongoClient;
const appConf = config.get('app');
const mongo = config.get('mongo');
const mongodber = require('./lib/mongodber');
const enums = require('./lib/enum');

const port = process.env.SERVICE_PORT || appConf.port;
// 初始化
init(err => {
    if (err) {
        console.log(`Error: ${JSON.stringify(err.stack || err)}`);
        return process.exit(-1);
    } else {
        console.info('Server is ready!');
    }
});

function init(callback) {
    Thenjs(cont => {
        MongoClient.connect(mongo.uri, (err, result) => {
            if (err) return callback(err);

            mongodber._db.player = result.db('player');
            cont(null, null);
        });
    }).then(cont => {
        const app = require('./app');
        
        const server = app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
            cont();
        });
        server.on('error', onError);
    }).fin(function (cont, err) {
        return callback(err);   
    });
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    switch (error.code) {
    case 'EACCES':
        console.error(appConf.port + ' requires elevated privileges');
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(appConf.port + ' is already in use');
        process.exit(1);
        break;
    default:
        throw error;
    }
}

// 全局错误处理
process.on('uncaughtException', (err) => {
    const errMsg = {
        api: 100,
        msg: 'Global caught exception!',
        errStack: err.stack || err
    };

    console.error(`==code:${enums.Code.GLOBAL_ERR}==errMsg:${JSON.stringify(errMsg)}==`);
});