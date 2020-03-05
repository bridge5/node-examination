process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server');

var should = chai.should();

chai.use(chaiHttp);

describe('Player', function() {
    const newPlayer = {
        id: 11,
        name: 'Yao',
        position: 'C'
    }
    const updatePlayer = {
        id: 11,
        name: 'Yao',
        position: 'PG'
    }
    it('should add a player on /player POST 200', function(done) {
        chai.request(server)
        .post('/v1/player')
        .send(newPlayer)
        .end(function(err, res){
            res.should.have.status(200);
            res.body.code.should.equal(200);
            res.body.data.id.should.equal(11);
            res.body.data.name.should.equal('Yao');
            res.body.data.position.should.equal('C');
            done();
        });
    });

    it('should add the player again on /player POST 405', function(done) {
        chai.request(server)
        .post('/v1/player')
        .send(newPlayer)
        .end(function(err, res){
            res.should.have.status(200);
            res.body.code.should.equal(405);
            done();
        });
    });

    it('should get the player on /player GET 200 400 404', function(done) {
        chai.request(server)
        .get(`/v1/player/${newPlayer.id}`)
        .end(function(err, res){
            res.should.have.status(200);
            res.body.code.should.equal(200);
            res.body.data.id.should.equal(11);
            res.body.data.name.should.equal('Yao');
            res.body.data.position.should.equal('C');
        });

        chai.request(server)
        .get(`/v1/player/aaa`)
        .end(function(err, res){
            res.should.have.status(200);
            res.body.code.should.equal(400);
        });

        chai.request(server)
        .get(`/v1/player/999`)
        .end(function(err, res){
            res.should.have.status(200);
            res.body.code.should.equal(404);
            done();
        });
    });

    it('should update the player on /player PUT 200 405 404', function(done) {
        chai.request(server)
        .put('/v1/player')
        .send(updatePlayer)
        .end(function(err, res){
            res.should.have.status(200);
            res.body.code.should.equal(200);
            res.body.data.position.should.equal('PG');
        });

        updatePlayer.position = 'W'
        chai.request(server)
        .put('/v1/player')
        .send(updatePlayer)
        .end(function(err, res){
            res.should.have.status(200);
            res.body.code.should.equal(405);
        });

        updatePlayer.id = 13
        updatePlayer.name = 'Harden'
        chai.request(server)
        .put('/v1/player')
        .send(updatePlayer)
        .end(function(err, res){
            res.should.have.status(200);
            res.body.code.should.equal(404);
            done();
        });
    });

    it('should delete the player on /player DELETE 200 400 404', function(done) {

        chai.request(server)
        .delete(`/v1/player/aa`)
        .end(function(err, res){
            res.should.have.status(200);
            res.body.code.should.equal(400);
        });

        chai.request(server)
        .delete(`/v1/player/${newPlayer.id}`)
        .end(function(err, res){
            res.should.have.status(200);
            res.body.code.should.equal(200);
        });

        chai.request(server)
        .delete(`/v1/player/999`)
        .end(function(err, res){
            res.should.have.status(200);
            res.body.code.should.equal(404);
            done();
        });
    });
}); 