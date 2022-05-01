'use strict';
const crypto = require('crypto');
const md5 = require('md5');
module.exports = {
  /**
        * 获取当前时间秒为单位的时间戳
        */
  currentTimestamp() {
    return parseInt(Date.parse(new Date()).toString().substr(0, 10));
  },
  getDbType() {
    if (!this.ctx.getData('dbType')) {
      this.ctx.setData('dbType', 'writeDdObj');
      if (this.ctx.app.config.readDdObj && this.ctx.app.config.readOnlyRouter[this.ctx.path]) {
        this.ctx.setData('dbType', 'readDdObj');
      }
    }
    return this.ctx.getData('dbType');
  },

  getDbIndex(dbType, dbKey) {
    const dataKey = 'dbIndex_' + dbType + dbKey;
    if (!this.ctx.getData(dataKey)) {
      let index = 0;
      if (this.ctx.app.config[dbType][dbKey].length > 1) {
        index = parseInt(Math.random() * this.ctx.app.config[dbType][dbKey].length);
      }
      this.ctx.setData(dataKey, index);
    }
    return this.ctx.getData(dataKey);
  },

  getDbModel(modelName, forceModel = '') {
    if (!forceModel) {
      if (modelName == 'sequelize') {
        throw Error('require forceModel');
      }
      forceModel = modelName;
    }
    const dataKey = 'dbName_' + forceModel;
    if (!this.ctx.getData(dataKey)) {
      let dbType = this.getDbType(),
        dbKey = 'default';
      if (this.ctx.app.config.modelNotDefault[forceModel]) {
        dbKey = this.ctx.app.config.modelNotDefault[forceModel];
      }
      const index = this.getDbIndex(dbType, dbKey);

      this.ctx.setData(dataKey, this.ctx.app.config[dbType][dbKey][index]);
    }
    return this.ctx.app.orm(this.ctx.getData(dataKey))[modelName];
  },
};
