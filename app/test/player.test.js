let request = require('request');
let expect = require('chai').expect;
const httpHost = 'http://localhost:3000';
const enums = require('../lib/enum');

// 添加球员
describe('1.添加球员 POST: /player', function () {
    it('测试描述: 参数正确', function (done) {
        request({
            url: httpHost + '/player',
            method: 'POST',
            json: true,
            headers: {
                'content-type': 'application/json',
            },
            body: {
                id: 1,
                name: 'YYYj',
                position: 'SF'
            }
        }, function (error, response, body) {
            expect(!error && response.statusCode === 200);
            expect(body.code === enums.Code.SUCCESS);
            done();
        });
    });
    it('测试描述: 参数错误', function (done) {
        request({
            url: httpHost + '/player',
            method: 'POST',
            json: true,
            headers: {
                'content-type': 'application/json',
            },
            body: {
                id: 1,
                name: 'YYYj',
                position: 'SFF'
            }
        }, function (error, response, body) {
            expect(!error && response.statusCode === 200);
            expect(body.code === enums.Code.INVALID_INPUT);
            done();
        });
    });
});

// 修改球员
describe('2.修改球员 PUT /player', function () {
    it('测试描述: 参数正确', function (done) {
        request({
            url: httpHost + '/player',
            method: 'PUT',
            json: true,
            headers: {
                'content-type': 'application/json',
            },
            body: {
                id: 1,
                name: 'Yj',
                position: 'C'
            }
        }, function (error, response, body) {
            expect(!error && response.statusCode === 200);
            expect(body.code === enums.Code.SUCCESS);
            done();
        });
    });
    it('测试描述: id错误', function (done) {
        request({
            url: httpHost + '/player',
            method: 'PUT',
            json: true,
            headers: {
                'content-type': 'application/json',
            },
            body: {
                id: -1,
                name: 'YYYj',
                position: 'C'
            }
        }, function (error, response, body) {
            expect(!error && response.statusCode === 200);
            expect(body.code === enums.Code.INVALID_ID);
            done();
        });
    });
    it('测试描述: 球员不存在', function (done) {
        request({
            url: httpHost + '/player',
            method: 'PUT',
            json: true,
            headers: {
                'content-type': 'application/json',
            },
            body: {
                id: 2,
                name: 'YYYj',
                position: 'C'
            }
        }, function (error, response, body) {
            expect(!error && response.statusCode === 200);
            expect(body.code === enums.Code.NOT_FOUND);
            done();
        });
    });
    it('测试描述: 参数错误', function (done) {
        request({
            url: httpHost + '/player',
            method: 'PUT',
            json: true,
            headers: {
                'content-type': 'application/json',
            },
            body: {
                id: 2,
                name: 'YYYj',
                position: 'SFF'
            }
        }, function (error, response, body) {
            expect(!error && response.statusCode === 200);
            expect(body.code === enums.Code.INVALID_INPUT);
            done();
        });
    });
});

// 获取球员
describe('3.获取球员 GET /player/:playId', function () {
    it('测试描述: 参数正确', function (done) {
        request({
            url: httpHost + '/player/1',
            method: 'GET',
            json: true,
            headers: {
                'content-type': 'application/json',
            }
        }, function (error, response, body) {
            expect(!error && response.statusCode === 200);
            expect(body.code === enums.Code.SUCCESS);
            done();
        });
    });
    it('测试描述: id错误', function (done) {
        request({
            url: httpHost + '/player/-1',
            method: 'GET',
            json: true,
            headers: {
                'content-type': 'application/json',
            }
        }, function (error, response, body) {
            expect(!error && response.statusCode === 200);
            expect(body.code === enums.Code.INVALID_ID);
            done();
        });
    });
    it('测试描述: 球员不存在', function (done) {
        request({
            url: httpHost + '/player/999',
            method: 'GET',
            json: true,
            headers: {
                'content-type': 'application/json',
            }
        }, function (error, response, body) {
            expect(!error && response.statusCode === 200);
            expect(body.code === enums.Code.NOT_FOUND);
            done();
        });
    });
});

// 删除球员
describe('4.删除球员 DELETE /player/:playId', function () {
    it('测试描述: 参数正确', function (done) {
        request({
            url: httpHost + '/player/1',
            method: 'DELETE',
            json: true,
            headers: {
                'content-type': 'application/json',
            }
        }, function (error, response, body) {
            expect(!error && response.statusCode === 200);
            expect(body.code === enums.Code.SUCCESS);
            done();
        });
        it('测试描述: id错误', function (done) {
            request({
                url: httpHost + '/player/-1',
                method: 'DELETE',
                json: true,
                headers: {
                    'content-type': 'application/json',
                }
            }, function (error, response, body) {
                expect(!error && response.statusCode === 200);
                expect(body.code === enums.Code.INVALID_ID);
                done();
            });
        });
        it('测试描述: 球员不存在', function (done) {
            request({
                url: httpHost + '/player/999',
                method: 'DELETE',
                json: true,
                headers: {
                    'content-type': 'application/json',
                }
            }, function (error, response, body) {
                expect(!error && response.statusCode === 200);
                expect(body.code === enums.Code.NOT_FOUND);
                done();
            });
        });
    });
});