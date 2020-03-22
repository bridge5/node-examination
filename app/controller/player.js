/*
 * 用户部分
 */

'use strict';

const PlayerService = require('../service/player');

module.exports = {
  /**
   * @param ctx {import('koa').Context}
   */
  addPlayer: async (ctx) => {
    const {name, age, phone} = ctx.request.body;

    const player = await PlayerService.addPlayer({
      name, 
      age, 
      phone,
    });
    ctx.body = {
      playerId: player.playerId,
      name: player.name,
    };
  },

  /**
   * @param ctx {import('koa').Context}
   */
  updatePlayer: async (ctx) => {
    const {id} = ctx.params;

    const player = await PlayerService.updatePlayer(id, ctx.request.body);
    ctx.body = {
      playerId: player,
    };
  },


  deletePlayer: async (ctx) => {
    const {id} = ctx.params;

    const player = await PlayerService.deletePlayer(id);
    ctx.body = {
      player,
    };
  },


  getPlayer: async (ctx) => {
    const {id} = ctx.params;

    const player = await PlayerService.getPlayer(id);
    ctx.body = {
      player,
    };
  },
};
