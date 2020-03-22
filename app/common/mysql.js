'use strict';

const config = require('../config').mysql;
const Sequelize = require('sequelize');

if (config.orm.logging) {
  config.orm.logging = (sql) => {
    console.log(sql);
  };
}

const pool = new Sequelize(config.database, config.user, config.password, config.orm);

pool.authenticate()
  .then(() => {
    console.log('DB Connection has been established successfully');
  })
  .catch( err => {
    console.log('Unable to connect to the database', err);
  });

module.exports = {
  pool,
  Sequelize,
};
