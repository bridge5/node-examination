var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://122.51.124.76:27017/yuan";

function mongoconn(callback) {
    MongoClient.connect(url, (err, db) => {
        if (err) {
            console.log('数据库连接失败！');
            return;
        };
    })
}
//保存数据
module.exports.setToken = function(collection, json, callback) {
    mongoconn(function(err, db) {
        if (err) {
            console.log('数据库连接失败！');
            return;
        };
        db.collection(collection).insertOne(json, (err, result) => {
            callback(err, result);
            db.close();
        })
    })
};