const mongoose = require("mongoose");
const Player = require('../schema/player');
require('dotenv').config()
var chaiHttp = require('chai-http');
const assert = require('assert');
const chai = require('chai');
const server = require('../server');
var should = chai.should();


chai.use(chaiHttp);

describe('REST API',()=>{


  beforeEach(function(done){
    let newPlayer = new Player({
      name: "Leborn",
      id: 0,
      position: "C"
    });
    newPlayer.save(function(err) {
      done();
    });
  });
  afterEach(function(done){
    Player.collection.drop();
    done();
  });
  it('Create One player',(done)=>{
    chai.request(server)
    .post('/player')
    .send({'name': 'asdf', 'position': 'C', 'id':1})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('name');
      res.body.should.have.property('position');
      res.body.should.have.property('id');
      res.body.name.should.equal('asdf');
      res.body.id.should.equal(1);
      res.body.position.should.equal('C');
      done();
    });

  })
  it('Update One player',(done)=>{
    chai.request(server)
    .put('/player/')
    .send({'name': 'asdf', 'position': 'C', 'id':0})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.have.property('id');
      res.body.should.have.property('name');
      res.body.should.have.property('position');
      res.body.name.should.equal('asdf');
      res.body.position.should.equal('C');
      res.body.id.should.equal(0);

      done();
    })
  })
  //using :id
  it('Get One player',(done)=>{
    chai.request(server)
    .get('/player/0')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.have.property('_id');
      res.body.should.have.property('name');
      res.body.should.have.property('position');
      res.body.name.should.equal('Leborn');
      res.body.position.should.equal('C');
      done();
    })
  })
  it('Delete One player',(done)=>{
    chai.request(server)
    .delete('/player/0')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.have.property('status');
      res.body.should.have.property('message');
      res.body.status.should.equal(0);
      res.body.message.should.equal('deleted');

      done();
    })
  })



})

