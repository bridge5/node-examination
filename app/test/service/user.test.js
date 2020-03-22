'use strict';

const assert = require('assert');
const mm = require('mm');
const C = require('../../common/constant');
const PlayerService = require('../../service/player');

describe('service/player.js', () => {

  describe('创建用户', () => {
    it('创建用户成功 & 删除用户', async () => {
      const data = {
        name: 'davis',
        age: 18,
        phone: 13888888888,
      };
      let flag = true;
      try {
        const player = await PlayerService.addPlayer(data);

        assert.equal(player.name, data.name);
        assert(player.playerId > 0);

        // 清理数据
        await PlayerService.deletePlayer(player.playerId);
      } catch (e) {
        flag = false;
      }

      assert(flag === true);
    });
  });
});
