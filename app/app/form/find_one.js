'use strict';

module.exports = app => {
  const Parameter = require('parameter');

  class FindOne {
    // 构造检查对象
    constructor(ctx) {
      this.ctx = ctx;
      this.param = new Parameter();
      this.rule = {
        playerId: {
          type: 'int',
          required: true,
        },

      };
    }

    // 检查数据
    checkData(data) {
      this.data = data;
      const res = this.param.validate(this.rule, this.data);
      if (res != undefined) {
        throw new app.util.businessError('10002', res[0].field + ' ' + res[0].code);
      }
      this.checkAfterValidate();
      return this.formate();
    }

    // 校验器
    checkAfterValidate() { }

    // 数据处理
    formate() {
      return {
        playerId: this.data.playerId,
      };
    }
  }

  return FindOne;
};
