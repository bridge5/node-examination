const request = require('supertest');
const app = require('../app/server');

describe('Player', () => {
    it('add player 200', done => {
        request('http://localhost:3000')
        .post('/player')
        .send({
            id: 9,
            name: 'test',
            position: 'PF'
        })
        .expect(200, (err, res) => {
            if(err) {
                console.log(err);
                done(err);
            } else {
                done();
            }
        })
    });

    it('add player 405 A', done => {
        request('http://localhost:3000')
        .post('/player')
        .send({
            id: 1,
            name: 'test',
            position: 'PFF'
        })
        .expect(405, (err, res) => {
            if(err) {
                console.log(err);
                done(err);
            } else {
                done();
            }
        });
    });

    it('add player 405 B', done => {
        request('http://localhost:3000')
        .post('/player')
        .send({
            name: 'test',
            position: 'PF'
        })
        .expect(405, (err, res) => {
            if(err) {
                console.log(err);
                done(err);
            } else {
                done();
            }
        });
    });

    it('update player 200', done => {
        request('http://localhost:3000')
        .put('/player')
        .send({
            id: 9,
            name: 'test01',
            position: 'PF'
        })
        .expect(200, (err, res) => {
            if(err) {
                console.log(err);
                done(err);
            } else {
                done();
            }
        });
    });

    it('update player 404', done => {
        request('http://localhost:3000')
        .put('/player')
        .send({
            id: 9988,
            name: 'test01',
            position: 'PF'
        })
        .expect(404, (err, res) => {
            if(err) {
                console.log(err);
                done(err);
            } else {
                done();
            }
        });
    });

    it('update player 405', done => {
        request('http://localhost:3000')
        .put('/player')
        .send({
            id: 1,
            name: 'test01'
        })
        .expect(405, (err, res) => {
            if(err) {
                console.log(err);
                done(err);
            } else {
                done();
            }
        });
    });

    it('get player 200', done => {
        request('http://localhost:3000')
        .get('/player/9')
        .expect(200, (err, res) => {
            if(err) {
                console.log(err);
                done(err);
            } else {
                done();
            }
        });
    });

    it('get player 404', done => {
        request('http://localhost:3000')
        .get('/player/6789')
        .expect(404, (err, res) => {
            if(err) {
                console.log(err);
                done(err);
            } else {
                done();
            }
        });
    });

    it('delete player 200', done => {
        request('http://localhost:3000')
        .delete('/player/9')
        .expect(200, (err, res) => {
            if(err) {
                console.log(err);
                done(err);
            } else {
                done();
            }
        });
    });

    it('delete player 404', done => {
        request('http://localhost:3000')
        .delete('/player/9')
        .expect(404, (err, res) => {
            if(err) {
                console.log(err);
                done(err);
            } else {
                done();
            }
        });
    });
});