/*
 * @Description:player 模型测试
 */
const Player = require('../../src/models/player')

test('Player 模型验证', () => {
  const player = new Player({
    name: 'laoxu',
    position: 'C'
  })
  expect(player.name).toBe('laoxu')
  expect(player.position).toBe('C')
})

