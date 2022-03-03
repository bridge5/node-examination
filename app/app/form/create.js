'use strict';

module.exports = app => {
  const Parameter = require('parameter');

  class Create {
    // 构造检查对象
    constructor(ctx) {
      this.ctx = ctx;
      this.param = new Parameter();
      this.rule = {
        name: {
          type: 'string',
          required: true,
        },
        id: {
          type: 'int',
          required: true,
        },
        position: {
          type: 'string',
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
        name: this.data.name,
        playerId: this.data.id,
        position: this.data.position,
      };
    }
  }

  return Create;
};
