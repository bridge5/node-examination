process.env.NODE_ENV = 'test';

const Players = require('../models/players');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Players', () => {
  before((done) => { 
      Players.remove({}, (err) => { 
         done();           
      });        
  });

  describe('/POST player', () => {
    it('Lebron should be added', (done) => {
      const Lebron = {
        id: 0,
        name: 'Lebron James',
        position: 'SF'
      }
      chai.request(server)
          .post('/player')
          .send(Lebron)
          .end((err, res) => {
              res.should.have.status(200);
              done();
          });
    });
    it('Harden should have invalid input', (done) => {
      const Harden = {
        id: 1,
        name: 'James Harden',
        position: 'AS'
      };
      chai.request(server)
        .post('/player')
        .send(Harden)
        .end((err, res) => {
            res.should.have.status(405);
            done();
        });
    });
    it('Curry should have invalid input due to duplicate id', (done) => {
      const Curry = {
        id: 0,
        name: 'Steph Curry',
        position: 'PG'
      };
      chai.request(server)
        .post('/player')
        .send(Curry)
        .end((err, res) => {
            res.should.have.status(405);
            done();
        });
    });
    it('Durant should be added', (done) => {
      const Durant = {
        id: 1,
        name: 'Kevin Durant',
        position: 'SF'
      }
      chai.request(server)
          .post('/player')
          .send(Durant)
          .end((err, res) => {
              res.should.have.status(200);
              done();
          });
    });
  });
  describe('/PUT player', () => {
    it('Lebron cannot be updated due to invalid ID', (done) => {
      const Lebron = {
        id: 'abc',
        name: 'Lebron James',
        position: 'SG'
      }
      chai.request(server)
          .put('/player')
          .send(Lebron)
          .end((err, res) => {
              res.should.have.status(400);
              done();
          });
      });
    it('Harden cannot be updated due to player not found', (done) => {
      const Harden = {
        id: 2,
        name: 'James Harden',
        position: 'SG'
      }
      chai.request(server)
          .put('/player')
          .send(Harden)
          .end((err, res) => {
              res.should.have.status(404);
              done();
          });
      });
    it('Durant cannot be updated due to validation exception ', (done) => {
      const Durant = {
        id: 1,
        name: 'Kevin Durant',
        position: 'SS'
      }
      chai.request(server)
          .put('/player')
          .send(Durant)
          .end((err, res) => {
              res.should.have.status(405);
              done();
          });
      });
    it('Durant was successfully updated and became Curry', (done) => {
      const Durant = {
        id: 1,
        name: 'Steph Curry',
        position: 'PG'
      };
      chai.request(server)
          .put('/player')
          .send(Durant)
          .end((err, res) => {
              Players.findOne({id: 1})
                      .then((player) => {
                        player.name.should.be.eql('Steph Curry');
                        player.position.should.be.eql('PG');
                        done();
                      })
          });
    });
  });
  describe('/GET player', () => {
    it('Player cannot be found due to invalid ID', (done) => {
      chai.request(server)
          .get('/player/abc')
          .end((err, res) => {
              res.should.have.status(400);
              done();
          });
      });
    it('Player cannot be found due to player not found', (done) => {
      chai.request(server)
          .get('/player/55')
          .end((err, res) => {
              res.should.have.status(404);
              done();
          });
      });
    it('Curry is found', (done) => {
      chai.request(server)
          .get('/player/1')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('name').eql('Steph Curry');
              done();
          });
      });
  });
  describe('/DELETE player', () => {
    it('Player cannot be deleted due to invalid ID', (done) => {
      chai.request(server)
          .delete('/player/abc')
          .end((err, res) => {
              res.should.have.status(400);
              done();
          });
      });
    it('Player cannot be deleted due to player not found', (done) => {
      chai.request(server)
          .delete('/player/55')
          .end((err, res) => {
              res.should.have.status(404);
              done();
          });
      });
    it('Curry is deleted', (done) => {
      chai.request(server)
          .delete('/player/1')
          .end((err, res) => {
            Players.findOne({name: 'Steph Curry'})
                  .exec()
                  .then((player) => {
                    should.not.exist(player)
                    done();
                  });
          });
      });
  });
});