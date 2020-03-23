const app = require('../app');
const assert = require('assert');
const Player = require('../models/playerModel');
const request = require('supertest');

describe('/player', function() {
  this.timeout(10000);

  // POST /player
  describe('POST /player', function() {

    it('create a new player', function(done) {
      request(app)
        .post('/player')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({
          name: 'LeBron',
          position: 'C'
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          assert.strictEqual('LeBron', res.body.name);
          assert.strictEqual('C', res.body.position);

          Player.findByIdAndDelete(res.body.id).exec(done);
        });
    });

    it('create a new player with name', function(done) {
      request(app)
        .post('/player')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({ name: 'Perry' })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          assert.strictEqual('Perry', res.body.name);
          assert.strictEqual(undefined, res.body.position);

          Player.findByIdAndDelete(res.body.id).exec(done);
        });
    });

    it('create a new player with invalid name and postion', function(done) {
      request(app)
        .post('/player')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({ position: 'unknow' })
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);

          assert.strictEqual(2, res.body.errors.length);
          assert.deepStrictEqual(res.body.errors, [
            {
              "kind": "required",
              "message": "Path `name` is required.",
              "path": "name"
            },
            {
              "kind": "enum",
              "message": "`unknow` is not a valid enum value for path `position`.",
              "path": "position"
            }
          ]);
          done();
        });
    });
  });


  // GET /player
  describe('GET /player', function() {

    let player = undefined;

    before(function(done) {
      player = new Player({
        name: 'LeBron',
        position: 'C'
      });
      player.save(done);
    });

    after(function(done) {
      Player.findByIdAndDelete(player.id).exec(done);
    });

    it('get a player', function(done) {
      request(app)
        .get(`/player/${player.id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          assert.strictEqual(player.id, res.body.id);
          assert.strictEqual('LeBron', res.body.name);
          assert.strictEqual('C', res.body.position);
          done();
        });
    });

    it('get an non-existent player', function(done) {
      request(app)
        .get(`/player/5e782274d801e125a41393f1`)
        .set('Accept', 'application/json')
        .expect(404, done);
    });
  });


  // PUT /player
  describe('PUT /player', function() {

    let player = undefined;

    beforeEach(function(done) {
      player = new Player({
        name: 'LeBron',
        position: 'C'
      });
      player.save(done);
    });

    afterEach(function(done) {
      Player.findByIdAndDelete(player.id).exec(done);
    });

    it('update a player', function(done) {
      request(app)
        .put(`/player/${player.id}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({
          name: 'Perry',
          position: 'SF'
        })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          assert.strictEqual(player.id, res.body.id);
          assert.strictEqual('Perry', res.body.name);
          assert.strictEqual('SF', res.body.position);
          done();
        });
    });

    it('update a player with invalid name and position', function(done) {
      request(app)
        .put(`/player/${player.id}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({
          name: '',
          position: 'unknow'
        })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);

          assert.strictEqual(2, res.body.errors.length);
          assert.deepStrictEqual(res.body.errors, [
            {
              "kind": "required",
              "message": "Path `name` is required.",
              "path": "name"
            },
            {
              "kind": "enum",
              "message": "`unknow` is not a valid enum value for path `position`.",
              "path": "position"
            }
          ]);
          done();
        });
    });

    it('update an non-existent player', function(done) {
      request(app)
        .put(`/player/5e782274d801e125a41393f1`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(404, done);
    });
  });


  // DELETE /player
  describe('DELETE /player', function() {

    let player = undefined;

    before(function(done) {
      player = new Player({
        name: 'LeBron',
        position: 'C'
      });
      player.save(done);
    });

    after(function(done) {
      Player.findByIdAndDelete(player.id).exec(done);
    });

    it('delete a player', function(done) {
      request(app)
        .delete(`/player/${player.id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) return next(err);

          assert.strictEqual(player.id, res.body.id);
          assert.strictEqual('LeBron', res.body.name);
          assert.strictEqual('C', res.body.position);
          done();
        });
    });

    it('delete an deleted player', function(done) {
      request(app)
        .delete(`/player/${player.id}`)
        .set('Accept', 'application/json')
        .expect(404, done);
    });

  });

});
