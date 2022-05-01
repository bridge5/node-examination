'use strict';
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
/**
 * Create a new player
 * 
 *
 * body Player Player object
 * no response value expected for this operation
 **/
exports.addPlayer = function (body) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("nbadb");
      dbo.collection("player").find({ "id": body.id }).toArray(function (err, examples) { // 返回集合中所有数据
        if (err) throw err;
        if (Object.keys(examples).length > 0) {
          db.close();
          resolve(examples[Object.keys(examples)[0]]['_id']);
        } else {
          dbo.collection("player").insertOne(body, function (err, res) {
            db.close();
            if (err) throw err;
            resolve(res.insertedId);
          });
        }

      });
    });
  });
}



/**
 * Deletes a player
 * 
 *
 * playerId Long Player id to delete
 * no response value expected for this operation
 **/
exports.deletePlayer = function (playerId) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("nbadb");
      var whereStr = { "id": playerId };  // 查询条件
      dbo.collection("player").deleteOne(whereStr, function (err, res) {
        db.close();
        if (err) throw err;
        resolve(res);
      });
    });

  });
}


/**
 * Find player by ID
 * Returns a single player
 *
 * playerId Long ID of player to return
 * returns Player
 **/
exports.getPlayerById = function (playerId) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("nbadb");
      dbo.collection("player").find({ "id": playerId }).toArray(function (err, examples) { // 返回集合中所有数据
        db.close();
        if (err) throw err;
        if (Object.keys(examples).length > 0) {
          resolve(examples[Object.keys(examples)[0]]);
        } else {
          resolve();
        }

      });
    });

  });
}


/**
 * Update an existing player
 * 
 *
 * body Player Player object that needs to be added to the team
 * no response value expected for this operation
 **/
exports.updatePlayer = function (body) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("nbadb");
      var whereStr = { "id": body.id };  // 查询条件
      var updateStr = { $set: body };
      dbo.collection("player").updateOne(whereStr, updateStr, function (err, res) {
        db.close();
        if (err) throw err;
        resolve(res);
      });
    });

  });
}

