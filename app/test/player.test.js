'use strict';
// const expect = require('chai').expect;
const app = require('../server');
const request = require('supertest').agent(app.listen());
const { describe, it, before } = require('mocha');



describe("test/app/src/controller/player.test.js", () => {
    let data;
    describe('test when validate faile', () => {
        before(() => {
            data = {
                id: "a",
                name: "Leod",
                position: 'PDF'
            }
        })

        it("should return 400 when GET /v1/player/:playerId", (done) => {
            request.get('/v1/player/' + data.id)
                .set('Accept', 'application/json')
                .expect(400, done)
        })

        it('shold return 400 when POST /v1/player', (done) => {
            request.post('/v1/player/')
                .send(data)
                .expect(400, done);
        })

        it("should return 400 when DELETE /v1/player/:playerId", (done) => {
            request.delete('/v1/player/' + data.id)
                .set('Accept', 'application/json')
                .expect(400, done)
        })

        it('shold return 400 when PUT /v1/player', (done) => {
            request.put('/v1/player/')
                .send(data)
                .expect(400, done);
        })
    });

    describe('test when validate success', () => {
        before(() => {
            data = {
                id: 26,
                name: "Leod",
                position: 'PF'
            }
        })
    
        it("should return 404 when GET /v1/player/:playerId", (done) => {
            request.get('/v1/player/' + data.id)
                .set('Accept', 'application/json')
                .expect(404, done)
        })
    
        it('shold create player when POST /v1/player', (done) => {
            request.post('/v1/player/')
                .send(data)
                .expect(200, done);
        })
    
        it('shold return 405 when POST /v1/player', (done) => {
            request.post('/v1/player/')
                .send(data)
                .expect(405, done);
        })
    
        it("should get player info when GET /v1/player/:playerId", (done) => {
            request.get('/v1/player/' + data.id)
                .set('Accept', 'application/json')
                .expect(200, done)
        })
    
        it("should update player info when PUT /v1/player", (done) => {
            data.name = "jhon";
            request.put('/v1/player/')
                .send(data)
                .set('Accept', 'application/json')
                .expect(200, done)
        })
    
        it("should delete player when DELETE /v1/player/:playerId", (done) => {
            request.delete('/v1/player/' + data.id)
                .set('Accept', 'application/json')
                .expect(200, done)
        })
    
        it("should return 404 when DELETE /v1/player/:playerId", (done) => {
            request.delete('/v1/player/' + data.id)
                .set('Accept', 'application/json')
                .expect(404, done)
        })
    })
})
