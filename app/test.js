let request = require('request');
let expect = require('chai').expect;
const httpHost = 'http://localhost:3000/api/v1';
const RES = require('../config/config.js').RES;

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
                id: 100,
                name: 'qiaodan',
                position: 'C'
            }
        }, function (error, response, body) {
            expect(!error && response.statusCode === 200);
            expect(body.code === RES.SUCCESS.code);
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
                id: '101',
                name: 'cilo',
                position: 'SFF'
            }
        }, function (error, response, body) {
            expect(!error && response.statusCode === 200);
            expect(body.code === RES.INVALIDINPUT.code);
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
                id: 100,
                name: 'qiaodan',
                position: 'C'
            }
        }, function (error, response, body) {
            expect(!error && response.statusCode === 200);
            expect(body.code === RES.SUCCESS.code);
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
                name: 'qiaodan',
                position: 'C'
            }
        }, function (error, response, body) {
            expect(!error && response.statusCode === 200);
            expect(body.code === RES.INVALIDIDSUPPLIED.code);
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
                id: 101,
                name: 'qiaodan',
                position: 'C'
            }
        }, function (error, response, body) {
            expect(!error && response.statusCode === 200);
            expect(body.code === RES.PLAYERNOTFOUND.code);
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
                id: 100,
                name: 'make',
                position: 'SFF'
            }
        }, function (error, response, body) {
            expect(!error && response.statusCode === 200);
            expect(body.code === RES.VALIDATIONEXCEPTION.code);
            done();
        });
    });
});

// 获取球员
describe('3.获取球员 GET /player/:playId or /player', function () {
    it('测试描述: 参数正确', function (done) {
        request({
            url: httpHost + '/player/100',
            method: 'GET',
            json: true,
            headers: {
                'content-type': 'application/json',
            }
        }, function (error, response, body) {
            expect(!error && response.statusCode === 200);
            expect(body.code === RES.SUCCESS.code);
            done();
        });
    });
    it('测试描述: 无参数', function (done) {
        request({
            url: httpHost + '/player',
            method: 'GET',
            json: true,
            headers: {
                'content-type': 'application/json',
            }
        }, function (error, response, body) {
            expect(!error && response.statusCode === 200);
            expect(body.code === RES.SUCCESS.code);
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
            expect(body.code === RES.INVALIDIDSUPPLIED.code);
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
            expect(body.code === RES.PLAYERNOTFOUND.code);
            done();
        });
    });
});

// 删除球员
describe('4.删除球员 DELETE /player/:playId', function () {
    it('测试描述: 参数正确', function (done) {
        request({
            url: httpHost + '/player/100',
            method: 'DELETE',
            json: true,
            headers: {
                'content-type': 'application/json',
            }
        }, function (error, response, body) {
            expect(!error && response.statusCode === 200);
            expect(body.code === RES.SUCCESS.code);
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
                expect(body.code === RES.INVALIDIDSUPPLIED.code);
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
                expect(body.code === RES.PLAYERNOTFOUND.code);
                done();
            });
        });
    });
}); 