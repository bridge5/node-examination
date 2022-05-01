'use strict';

const Service = require('egg').Service;

class BaseModelDefineService extends Service {

  constructor(ctx) {
    super(ctx);
    this._models = {};
  }

  baseModelGet(key) {
    if (this._models[key] == null) {
      this._models[key] = this.ctx.helper.getDbModel(key);
    }
    return this._models[key];
  }

  get sequelize() {
    const key = 'sequelize_Player';
    if (this._models[key] == null) {
      this._models[key] = this.ctx.helper.getDbModel('sequelize', 'Player');
    }
    return this._models[key];
  }


  get Player() {
    return this.baseModelGet('Player');
  }


}

module.exports = BaseModelDefineService;
