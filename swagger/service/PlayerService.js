'use strict';


/**
 * Create a new player
 * 
 *
 * body Player Player object
 * no response value expected for this operation
 **/
exports.addPlayer = async function(body) {
  const newPlayer = new global.db.Player({
    id: body.id,
    name: body.name,
    position: body.position
  })
  return newPlayer.save()
}


/**
 * Deletes a player
 * 
 *
 * playerId Long Player id to delete
 * no response value expected for this operation
 **/
exports.deletePlayer = async function(playerId) {
  const result = await global.db.Player.deleteOne({id: playerId})
  if(result.deletedCount === 0) return 404
  return 200
}


/**
 * Find player by ID
 * Returns a single player
 *
 * playerId Long ID of player to return
 * returns Player
 **/
exports.getPlayerById = async function(playerId) {
  const dbPlayer = await global.db.Player.findOne({id: playerId})
  if(!dbPlayer) return 404
  return dbPlayer
}


/**
 * Update an existing player
 * 
 *
 * body Player Player object that needs to be added to the team
 * no response value expected for this operation
 **/
exports.updatePlayer = async function(body) {
  const dbPlayer = await global.db.Player.findOne({id: body.id})
  if(!dbPlayer) return 404
  dbPlayer.name = body.name || dbPlayer.name
  dbPlayer.position = body.position || dbPlayer.position
  await dbPlayer.save()
  return 200
}

