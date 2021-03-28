const MongoClient = require('mongodb').MongoClient;
const {DBURL, DBNAME}=require('config-lite')(__dirname);


let insertOne=async function(collection,data){
       return new Promise((resolve,reject)=>{
           MongoClient.connect(DBURL, function(err, db) {
               if (err) throw err;
               var dbo = db.db(DBNAME);
               dbo.collection(collection).insertOne(data, function(err, res) {
                   if (err){
                       throw err;
                   } else{
                       db.close();
                       resolve(res)
                   }

               });
           });
       });
}

let find=async function(collection,whereObject={}){
    return new Promise((resolve,reject)=>{
        MongoClient.connect(DBURL, function(err, db) {
            if (err) throw err;
            var dbo = db.db(DBNAME);
            dbo.collection(collection). find(whereObject).toArray(function(err, result) { // 返回集合中所有数据
                if (err){
                    throw  err;
                } else{
                    db.close();
                    console.log(result)
                    resolve(result)
                }
            });
        });
    });
}

let update=async function(collection,whereObject={},updateObject){
    return new Promise((resolve,reject)=>{
        MongoClient.connect(DBURL, function(err, db) {
            if (err) throw err;
            var dbo = db.db(DBNAME);
            dbo.collection(collection).update(whereObject, updateObject, function(err, res) {
                if (err){
                    throw err;
                } else{
                    db.close();
                    console.log(res)
                    resolve(res)
                }
            });
        });
    });
}

let deleteOne=async function(collection,whereObject={}){
    return new Promise((resolve,reject)=>{
        MongoClient.connect(DBURL, function(err, db) {
            if (err) throw err;
            var dbo = db.db(DBNAME);
            dbo.collection(collection).deleteOne(whereObject, function(err, obj) {
                if (err){
                    throw err;
                } else{
                    db.close();
                    console.log(obj)
                    resolve(obj)
                }
            });
        });
    });
}
module.exports={
    insertOne,
    find,
    update,
    deleteOne
}
