'use strict';

const PlayerModel = require('../models/Players');

/**
 * Create a new player
 * 
 *
 * body Player Player object
 * no response value expected for this operation
 **/
exports.addPlayer = function(player) {
  const playerModel = new PlayerModel({
    name: player.name,
    position: player.position
  })
  return playerModel.save();
}


/**
 * Deletes a player
 * 
 *
 * playerId Long Player id to delete
 * no response value expected for this operation
 **/
exports.deletePlayer = function(playerId) {
  return PlayerModel.deleteOne({ id: playerId });
}


/**
 * Find player by ID
 * Returns a single player
 *
 * playerId Long ID of player to return
 * returns Player
 **/
exports.getPlayerById = function(playerId) {
  return PlayerModel.findOne({ id: playerId });
}


/**
 * Update an existing player
 * 
 *
 * body Player Player object that needs to be added to the team
 * no response value expected for this operation
 **/
exports.updatePlayer = function(player) {
  const { id, name, position } = player;
  return PlayerModel.updateOne({ id: id }, { 
    $set: { 
        name: name, 
        position: position 
    }
  }, { runValidators: true })
}

