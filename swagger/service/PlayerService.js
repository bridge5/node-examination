'use strict';
var PlayerAPIs = require('../api/Player');


/**
 * Create a new player
 * 
 *
 * body Player Player object
 * no response value expected for this operation
 **/
exports.addPlayer = function(ctx) {
  return new Promise(function(resolve, reject) {
    const res = PlayerAPIs.addPlayer(ctx);
    resolve();
  });
}


/**
 * Deletes a player
 * 
 *
 * playerId Long Player id to delete
 * no response value expected for this operation
 **/
exports.deletePlayer = function(playerId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Find player by ID
 * Returns a single player
 *
 * playerId Long ID of player to return
 * returns Player
 **/
exports.getPlayerById = function(playerId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "LeBron",
  "id" : 0,
  "position" : "C"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update an existing player
 * 
 *
 * body Player Player object that needs to be added to the team
 * no response value expected for this operation
 **/
exports.updatePlayer = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

