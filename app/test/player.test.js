const request=require('supertest')
const app=require('../app.js')
const expect = require('chai').expect;
const {SERVERPORT}=require('config-lite')(__dirname);

describe("#test express app",function(){//http测试
    let server;
    before(function() {//执行测试用例前开启服务器
        // runs before all tests in this block
        server=app.listen(SERVERPORT);
    });

    after(function() {
        // runs after all tests in this block
        server.close();
    });

    describe('#test player api',function(){
        it('delete player ', function (done) {
            request(server)
                .delete('/api/v1/player/0')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200,function(err,res){
                    if(err){
                        console.log(err)
                        done(err)
                    }else{
                        expect(res.body).to.include.keys('code');
                        expect(res.body).to.include.keys('description');

                        done()
                    }
                })
        });
        it('#player not foud /',function(done){
            request(server)
                .get('/api/v1/player/0')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200,function(err,res){
                    if(err){
                        console.log(err)
                        done(err)
                    }else{
                        // console.log(res.body)
                        expect(res.body).to.include.keys('code');
                        expect(res.body).to.include.keys('description');
                        expect(res.body.code).to.be.equal(404)
                        done()
                    }
                })
        });
    })
})
