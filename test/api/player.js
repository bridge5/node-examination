const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../server');
const conn = require('../../swagger/db');

describe('player api test', function() {
  this.timeout(10000)
  // before(async () => {
  //   try {
  //     await conn.connect();
  //     await Promise.all(Object.keys(global.db).map(async (modelName) => {
  //       global.db[modelName].deleteMany({}, (err) => {
  //         if(err) throw new Error(err)
  //       })
  //     }));
  //   } catch(err) {
  //     throw new Error(err)
  //   } 
  // })
  before((done) => {
    conn.connect()
      .then(() => {
        Promise.all(Object.keys(global.db).map(async (modelName) => {
          global.db[modelName].deleteMany({}, (err) => {
            if(err) throw new Error(err)
          })
        })).then(() => {
          done()
        }).catch((err) => {
          done(err)
        })
      })
  })

  after((done) => {
    Promise.all(Object.keys(global.db).map(async (modelName) => {
      global.db[modelName].deleteMany({}, (err) => {
        if(err) throw new Error(err)
      })
    })).then(() => {
      conn.close()
        .then(() => done())
        .catch(err => done(err)) 
    })
  })

  // get
  it('should get empty Player arr', (done) => {
    global.db.Player.find({}, (err, arr) => {
      expect(arr.length).to.equal(0)
      done()
    }).catch(err => {
      done(err)
    })
  })
  it('should get Wade', (done) => {
    request(app).post('/player').send({
      name: 'Wade',
      position: 'SG'
    }).then(res => {
      request(app).get(`/player/${res.body.playerId}`)
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body).to.have.property('id')
          expect(res.body).to.have.property('name')
          expect(res.body).to.have.property('position')
          expect(res.body.name).to.equal('Wade')
          done()
        }).catch(err => {
          done(err)
        })
    })
  })
  it('should return Invalid ID supplied and 400', (done) => {
    request(app).get(`/player/wrongId`)
      .then(res => {
        expect(res.status).to.equal(400)
        expect(res.body.message).to.equal('Invalid ID supplied')
        done()
      })
  })
  it('should return Player not found and 404', (done) => {
    request(app).get(`/player/-1`)
      .then(res => {
        expect(res.status).to.equal(404)
        expect(res.body.message).to.equal('Player not found')
        done()
      }).catch(err => {
        done(err)
      })
  })


  // post
  it('should add PlayerId automatically and create a new Player', (done) => {
    request(app).post('/player').send({
      name: 'Lebron',
      position: 'SF'
    }).then(res => {
      expect(res.status).to.equal(200)
      done()
    }).catch(err => {
      done(err)
    })
  })
  it('position invalid, should get Invalid Input message', (done) => {
    request(app).post('/player').send({
      name: 'Lebron',
      position: 'DD'
    }).then(res => {
      expect(res.status).to.equal(405)
      expect(res.body.message).to.equal('Invalid Input')
      done()
    }).catch(err => {
      done(err)
    })
  })
  it('name invalid, should get Invalid Input message', (done) => {
    request(app).post('/player').send({
      name: '',
      position: 'DD'
    }).then(res => {
      expect(res.status).to.equal(405)
      expect(res.body.message).to.equal('Invalid Input')
      done()
    }).catch(err => {
      done(err)
    })
  })

  // update
  it('should return Invalid ID supplied and 400', (done) => {
    request(app).put('/player').send({
      id: 'wrongId',
      name: 'Kobe'
    }).then(res => {
        expect(res.status).to.equal(400)
        expect(res.body.message).to.equal('Invalid ID supplied')
        done()
      }).catch(err => {
        done(err)
      })
  })
  it('should return Player not found and 404', (done) => {
    request(app).put('/player').send({
      id: -1,
      name: 'Kobe'
    }).then(res => {
        expect(res.status).to.equal(404)
        expect(res.body.message).to.equal('Player not found')
        done()
      }).catch(err => {
        done(err)
      })
  })
  it('invalid name: should return 405', (done) => {
    global.db.Player.findOne({name: 'Wade'}, (err, player) => {
      request(app).put('/player').send({
        id: player.id,
        name: ''
      }).then(res => {
          expect(res.status).to.equal(405)
          expect(res.body.message).to.equal('Validation exception')
          done()
        })
    }).catch(err => {
      done(err)
    })
  })
  it('success, should return 200 status code', (done) => {
    global.db.Player.findOne({name: 'Wade'}, (err, player) => {
      request(app).put('/player').send({
        id: player.id,
        name: 'Kobe'
      }).then(res => {
          expect(res.status).to.equal(200)
          done()
        })
    }).catch(err => {
      done(err)
    })
  })

  // delete
  it('should return Invalid ID supplied and 400', (done) => {
    request(app).delete('/player/wrongId')
      .then(res => {
          expect(res.status).to.equal(400)
          expect(res.body.message).to.equal('Invalid ID supplied')
          done()
        }).catch(err => {
          done(err)
        })
  })
  it('should return Player not found and 404', (done) => {
    request(app).delete('/player/-1')
      .then(res => {
          expect(res.status).to.equal(404)
          done()
        }).catch(err => {
          done(err)
        })
  })
  it('success, should return 200', (done) => {
    request(app).delete('/player/1')
      .then(res => {
          expect(res.status).to.equal(200)
          done()
        }).catch(err => {
          done(err)
        })
  })
}) 