/**
 * Mongoose init
 */

'use strict';

const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const config = require('../config')()

// load mongoose Promise
mongoose.Promise = Promise;

// Model file path
const modelDir = '../model';
const modelPath = path.join(__dirname, modelDir);

/**
 * init mongoose client
 */
const createClient = function() {
    const options = {
        poolSize: 5,
        autoIndex: false,
        useFindAndModify: true,
        connectTimeoutMS: 10000,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    // create connect
    const conn = mongoose.createConnection(config.mongodbUrl, options);
    conn.on('error', function(err) {
        console.error(err);
    });
    conn.on('connected', function() {
        console.log('Mongodb connected');
    });
    conn.on('disconnected', function() {
        console.error('Mongodb disconnected');
    });

    loadModel(conn);
    return conn;
};

/**
 * load Model
 * @param  {Object} conn Mongoose client
 */
const loadModel = async function(conn) {
    const files = fs.readdirSync(modelPath) || [];
    files.forEach(file => {
        const { modelName, schema, tableName } = require(path.join(modelPath, file));
        conn.model(modelName, schema, tableName);
    });
};

module.exports = createClient();
