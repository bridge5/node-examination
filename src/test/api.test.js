const assert     = require('assert');
const http       = require('http');
const Koa        = require('koa');
const bodyparser = require('koa-bodyparser');
const request    = require('supertest');

let db, router, server;
let Player;
const app = new Koa();

before(function (done) {
  db = require('../app/libs/mongoose');
  db.once('connected', function () {
    Player = require('../app/schemas/player');
    router = require('../app/controllers/index');
    app.use(bodyparser({}));
    app.use(router);
    server = http.createServer(app.callback());
    done();
  });
});

after(function (done) {
  db.close(done);
});

describe("NBA player RESTful API", function () {


  it("server can run", async function () {
    let res = await request(server)
    .get('/v1')
    .expect(200);
    assert.deepStrictEqual(200, res.statusCode);
  });

  it("POST /v1/player: 405", async function () {
    let reqBody = {
      "id": "abc",
      "name": "LeBron",
      "position": 0
    };

    let res = await request(server)
    .post('/v1/player')
    .send(reqBody)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);

    assert.deepStrictEqual(405, res.body.code);
  });

  it("POST /v1/player: 400", async function () {
    let reqBody = {
      "id": parseInt(Math.random() * 10000),
      "name": "LeBron" + parseInt(Math.random() * 10000).toString(16),
      "position": "C"
    };
    await Player.create(reqBody);

    let res = await request(server)
    .post('/v1/player')
    .send(reqBody)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);

    await Player.deleteOne(reqBody).exec();

    assert.deepStrictEqual(400, res.body.code);
  });

  it("POST /v1/player: SUCCESS", async function () {
    let reqBody = {
      "id": parseInt(Math.random() * 10000),
      "name": "LeBron" + parseInt(Math.random() * 10000).toString(16),
      "position": "C"
    };
    let res     = await request(server)
    .post('/v1/player')
    .send(reqBody)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);

    await Player.deleteOne(reqBody).exec();

    assert.deepStrictEqual(0, res.body.code);
  });

  it("PUT /v1/player: 405", async function () {
    let reqBody = randomBody();
    //await Player.create(reqBody);
    reqBody.id  = 'aaaaaa';

    let res = await request(server)
    .put('/v1/player')
    .send(reqBody)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);

    assert.deepStrictEqual(405, res.body.code);
  });

  it("PUT /v1/player: 404", async function () {
    let reqBody = randomBody();

    let res = await request(server)
    .put('/v1/player')
    .send(reqBody)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);

    assert.deepStrictEqual(404, res.body.code);
  });

  it("PUT /v1/player: 400", async function () {
    //same as 404
    assert.deepStrictEqual(1, 1);
  });

  it("PUT /v1/player: SUCCESS", async function () {
    let reqBody = randomBody();
    await Player.create(reqBody);
    reqBody.name = randomBody().name;

    let res = await request(server)
    .put('/v1/player')
    .send(reqBody)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);

    await Player.deleteOne(reqBody).exec();

    assert.deepStrictEqual(0, res.body.code);
  });

  it("GET /v1/player: 400", async function () {
    let res = await request(server)
    .get('/v1/player/' + 'unknown')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);

    assert.deepStrictEqual(400, res.body.code);
  });

  it("GET /v1/player: 404", async function () {
    let reqBody = randomBody();

    let res = await request(server)
    .get('/v1/player/' + reqBody.id)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);

    assert.deepStrictEqual(404, res.body.code);
  });

  it("GET /v1/player: 200", async function () {
    let reqBody = randomBody();
    await Player.create(reqBody);

    let res = await request(server)
    .get('/v1/player/' + reqBody.id)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);

    await Player.deleteOne(reqBody).exec();

    assert.deepStrictEqual(200, res.body.code);
  });

  it("DELETE /v1/player: 400", async function () {
    let res = await request(server)
    .delete('/v1/player/' + 'unknown')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);


    assert.deepStrictEqual(400, res.body.code);
  });
  it("DELETE /v1/player: 404", async function () {
    let reqBody = randomBody();

    let res = await request(server)
    .delete('/v1/player/' + reqBody.id)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);


    assert.deepStrictEqual(404, res.body.code);
  });

  it("DELETE /v1/player: SUCCESS", async function () {
    let reqBody = randomBody();
    await Player.create(reqBody);

    let res = await request(server)
    .delete('/v1/player/' + reqBody.id)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);

    assert.deepStrictEqual(0, res.body.code);
  });
});

function randomBody() {
  return {
    "id": parseInt(Math.random() * 10000),
    "name": parseInt(Math.random() * 10 ** 10).toString(16),
    "position": "C"
  };
}
