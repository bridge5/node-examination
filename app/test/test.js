const request = require('request');
const expect = require('chai').expect;
const httpBaseUrl = "http://localhost:3000/api";
let playerId = 0

describe("Create a new player", () => {
    it("create right player", (done) => {
        request({
            url: httpBaseUrl + "/player",
            method: "POST",
            json: true,
            headers: {
                'content-type': 'application/json',
            },
            body: {
                name: 'Lebron',
                position: 'C'
            }
        }, (err, res, body) => {
            playerId = body.id
            expect(res.statusCode).to.equal(200);
            done();
        })
    })

    it("lose body", (done) => {
        request({
            url: httpBaseUrl + "/player",
            method: "POST",
            json: true,
            headers: {
                'content-type': 'application/json',
            },
            body: {
                name: 'Lebron',
            }
        }, (err, res, body) => {
            expect(res.statusCode).to.equal(405);
            done();
        })
    })
})

describe("Find player by ID", () => {
    it("find create player", (done) => {
        request({
            url: httpBaseUrl + "/player/" + playerId,
            method: "GET",
            json: true,
            headers: {
                'content-type': 'application/json',
            }
        }, (err, res, body) => {
            expect(res.statusCode).to.equal(200);
            done();
        })
    })

    it("not exixt player", (done) => {
        request({
            url: httpBaseUrl + "/player/10000",
            method: "GET",
            json: true,
            headers: {
                'content-type': 'application/json',
            }
        }, (err, res, body) => {
            expect(res.statusCode).to.equal(404);
            done();
        })
    })
})

describe("Update player by ID", () => {
    it("update player", (done) => {
        request({
            url: httpBaseUrl + "/player/",
            method: "PUT",
            json: true,
            headers: {
                'content-type': 'application/json',
            },
            body: {
                playerId: playerId,
                name: "Lebron James",
                position: "C"
            }
        }, (err, res, body) => {
            expect(res.statusCode).to.equal(200);
            expect(body.name).to.equal("Lebron James");
            done();
        })
    })

    it("update lose body player", (done) => {
        request({
            url: httpBaseUrl + "/player",
            method: "PUT",
            json: true,
            headers: {
                'content-type': 'application/json',
            },
            body: {
                playerId: playerId,
                name: "Lebron James"
            }
        }, (err, res, body) => {
            expect(res.statusCode).to.equal(405);
            done();
        })
    })

    it("update not found player", (done) => {
        request({
            url: httpBaseUrl + "/player",
            method: "PUT",
            json: true,
            headers: {
                'content-type': 'application/json',
            },
            body: {
                playerId: 10000000,
                name: "Lebron James",
                position: "C"
            }
        }, (err, res, body) => {
            expect(res.statusCode).to.equal(404);
            done();
        })
    })
})

describe("Delete player by ID", () => {
    it("Delete player", (done) => {
        request({
            url: httpBaseUrl + "/player/" + playerId,
            method: "DELETE",
            json: true,
            headers: {
                'content-type': 'application/json',
            }
        }, (err, res, body) => {
            expect(res.statusCode).to.equal(200);
            request({
                url: httpBaseUrl + "/player/" + playerId,
                method: "GET",
                json: true,
                headers: {
                    'content-type': 'application/json',
                }
            }, (err, res, body) => {
                expect(res.statusCode).to.equal(404);
            })
            done();
        })
    })
})