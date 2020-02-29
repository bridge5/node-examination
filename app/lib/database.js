const mongoose = require('mongoose');
const config = require('../config');
const util = require('../utils');
const schema = require('../schema');

const log = util.log;

const connectionString = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;

const db = module.exports = {};

db.Table = {};

db.Table.Player = mongoose.model('Player', schema.PlayerSchema);

db.connect = function() {
    return new Promise(resolve => {
        mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, err => {
            if(err) {
                log('Mongodb occured error when it was connecting.')
                throw err;
            }
            log('Mongodb has been connected.');
            resolve();
        });
    });
}
