const MongoClient = require('mongodb').MongoClient;
const MONGOURL = 'mongodb://localhost:27017/";';
const DBNAME = 'NBA';

let insertOne = async function(collection,data){
       return new Promise((resolve,reject)=>{
           MongoClient.connect(MONGOURL, function(err, db) {
               if (err) throw err;
               let dbo = db.db(DBNAME);
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

let find = async function(collection,whereObject={}){
    return new Promise((resolve,reject)=>{
        MongoClient.connect(MONGOURL, function(err, db) {
            if (err) throw err;
            let dbo = db.db(DBNAME);
            dbo.collection(collection).find(whereObject).toArray(function(err, res) { 
                if (err){
                    throw  err;
                } else{
                    db.close();
                    resolve(res)
                }
            });
        });
    });
}

let update = async function(collection,whereObject={},updateObject){
    return new Promise((resolve,reject)=>{
        MongoClient.connect(MONGOURL, function(err, db) {
            if (err) throw err;
            let dbo = db.db(DBNAME);
            dbo.collection(collection).update(whereObject, updateObject, function(err, res) {
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

let deleteOne = async function(collection,whereObject={}){
    return new Promise((resolve,reject)=>{
        MongoClient.connect(MONGOURL, function(err, db) {
            if (err) throw err;
            let dbo = db.db(DBNAME);
            dbo.collection(collection).deleteOne(whereObject, function(err, obj) {
                if (err){
                    throw err;
                } else{
                    db.close();
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