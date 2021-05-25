/**
 * File: server.test.js
 * Project: node-examination
 * FilePath: /test/server.test.js
 * Created Date: 2021-05-25 16:01:52
 * Author: SaltFish l1218838196@gmail.com
 * -----
 * Last Modified: 2021-05-25 16:40:27
 * Modified By: SaltFish
 * -----
 * Description:
 */

const request = require('supertest');
const server = require('../server');

describe('#test koa app', () => {

  it('player POST /v1/player', async () => {
    await request(server)
      .post('/v1/player')
      .send({
        "name": "Jack",
        "position": "SF",
        "id": 999
      })
      .expect(200, {
        "name": "Jack",
        "position": "SF",
        "id": 999
      })
  })

  it('player GET /v1/player/999', async () => {
    await request(server)
      .get('/v1/player/999')
      .expect(200, {
        "name": "Jack",
        "position": "SF",
        "id": 999
      })
  })

  it('player PUT /v1/player/999', async () => {
    await request(server)
      .put('/v1/player/999')
      .send({
        "name": "Json",
        "position": "C",
      })
      .expect(200, {
        "name": "Json",
        "position": "C",
        "id": 999
      })
  })
  
  it('player DELETE /v1/player/999', async () => {
    await request(server)
      .delete('/v1/player/999')
      .expect(200, {
        "name": "Json",
        "position": "C",
        "id": 999
      })
  })
})

after(() => {
  server.close()
})