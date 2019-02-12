process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server');
var Player = require("../app/models/player.model.js");

var should = chai.should();
chai.use(chaiHttp);


describe('Players', function() {
    var newPlayer = new Player({
        id: 123,
        name: "Tony Sui",
	    position: "C"
    });
    
    
    it('should add a SINGLE player on /player POST', function(done) {
        chai.request(server)
        .post('/player')
        .send(newPlayer)
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('id');
            res.body.should.have.property('position');
            res.body.id.should.equal(123);
            res.body.name.should.equal('Tony Sui');
            res.body.position.should.equal('C');
            done();
        });
    });
    
  
    it('should list a SINGLE player on /player/<id> GET', function(done) {
        chai.request(server)
        .get('/player/' + newPlayer.id)
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('id');
            res.body.should.have.property('position');
            res.body.id.should.equal(123);
            res.body.name.should.equal('Tony Sui');
            res.body.position.should.equal('C');
            done();
        });
    });
  
    it('should update a SINGLE player on /player PUT', function(done) {
        chai.request(server)
        .put('/player')
        .send({
            "id": 123,
            "name": "Mary Hu",
	        "position": "SG"
        })
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('id');
            res.body.should.have.property('position');
            res.body.id.should.equal(123);
            res.body.name.should.equal('Mary Hu');
            res.body.position.should.equal('SG');
            done();
        });
    });
    
    it('should list ALL players on /players GET', function(done) {
        chai.request(server)
        .get('/players')
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].id.should.equal(123);
            res.body[0].name.should.equal('Mary Hu');
            res.body[0].position.should.equal('SG');
            done();
        });
    });
  
    it('should delete a SINGLE player on /player/<id> DELETE', function(done) {
        chai.request(server)
        .delete('/player/' + newPlayer.id)
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            
            chai.request(server)
            .get('/player/' + newPlayer.id)
            .end(function(err, res){
                res.should.have.status(404);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            });
        });
    });
});