'use strict';
const BaseService = require('./base_model_define');
class PlayerService extends BaseService {
  constructor(ctx) {
    super(ctx);
  }

  async create(data) {
    const exsit = await this.Player.findOne({
      where: {
        playerId: data.playerId,
      },
      raw: true,
    });
    if (exsit) {
      return exsit;
    }

    const tn = this.ctx.helper.currentTimestamp();
    data.created = tn;
    data.modified = tn;
    return await this.Player.create(data);
  }

  async update(data) {
    const tn = this.ctx.helper.currentTimestamp();
    data.created = tn;
    data.modified = tn;
    return await this.Player.update(data, {
      where: {
        playerId: data.playerId,
      },
    });
  }


  async findOne(playerId) {
    return await this.Player.findOne({
      where: {
        playerId,
      },
      raw: true,
    });
  }

  async del(playerId) {
    return await this.Player.destroy({
      where: {
        playerId,
      },
    });
  }


}

module.exports = PlayerService;
