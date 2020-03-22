'use strict';

const C = require('../common/constant');
const log = require('../common/log');
const PlayerModel = require('../model/player');


const PlayerService = {
  /**
   * 创建新用户
   * @param {Object} data
   * @param {String} data.name
   * @param {Number} data.age
   * @param {Number} data.phone
   */
  addPlayer: async ({name, age, phone}) => {
    log.info('addPlayer param:', name, age, phone);
    const result = await PlayerModel.addPlayer({
      name, 
      age,
      phone
    });

    return result;
  },


  /**
   * 更新用户信息
   * @param {Number} playerId 用户id
   * @param {Object} opt
   */
  updatePlayer: async (playerId, opt) => {
    const data = {};
    if (opt.name) {
      data.name = opt.name;
    }

    if (opt.age) {
      data.age = opt.age;
    }

    if (opt.phone) {
      data.phone = opt.phone;
    }

    const result = await PlayerModel.updatePlayer(data, {
      playerId,
    });

    return result;
  },

  
  /**
   * 删除用户
   * @param {Number} playerId 用户id
   */
  deletePlayer: async (playerId) => {
    const result = await PlayerModel.updatePlayer(
      {
        invaild: C.CHAR.YES,
      }, 
      {
        playerId,
      }
    );

    return result;
  },


  /**
   * 获取用户信息
   * @param {Number} playerId 用户id
   */
  getPlayer: async (playerId) => {
    const result = await PlayerModel.getPlayer({
      playerId,
    });

    return result;
  },

};

module.exports = PlayerService;
