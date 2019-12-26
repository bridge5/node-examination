'use strict';

// var utils = require('../utils/writer.js');
const Player = require('../service/PlayerService');
const validNameAndPosition = require('../utils/validate');

module.exports.addPlayer = async function addPlayer (req, res, next) {
  const body = req.body;
  // validate
  if(validNameAndPosition(req.body)) {
    res.status(405).json({ message: 'Invalid Input' })
  } else {
    // add id automatically
    let dbPlayerId = await global.db.PlayerId.findOne({active: true})
    if(!dbPlayerId) {
      dbPlayerId = await new global.db.PlayerId({
        number: 0,
        active: true
      }).save()
    }
    dbPlayerId.number += 1
    await dbPlayerId.save()
    await Player.addPlayer({ ...body, id: dbPlayerId.number });
    res.status(200).json({ playerId: dbPlayerId.number });
  }
};

module.exports.deletePlayer = async function deletePlayer (req, res, next) {
  const playerId = req.params.playerId
  // validate: playerId must be number
  if(!isNaN(parseInt(playerId))) {
    const status = await Player.deletePlayer(playerId)
    if(status === 404) {
      res.status(404).json({ message: 'Player not found' })
    } else {
      res.status(200).end();
    }
  } else {
    res.status(400).json({ message: 'Invalid ID supplied' }) 
  }
};

module.exports.getPlayerById = async function getPlayerById (req, res, next) {
  const playerId = req.params.playerId
  // validate: playerId must be number
  if(!isNaN(parseInt(playerId))) {
    const foundPlayer = await Player.getPlayerById(playerId)
    if(foundPlayer === 404) {
      res.status(404).json({ message: 'Player not found' })
    } else {
      res.status(200).json({
        id: foundPlayer.id,
        name: foundPlayer.name,
        position: foundPlayer.position
      });
    }
  } else {
    res.status(400).json({ message: 'Invalid ID supplied' }) 
  }
};

module.exports.updatePlayer = async function updatePlayer (req, res, next) {
  const body = req.body
  // validate: body.id must be number
  if(!isNaN(parseInt(body.id))) {
    // validate name and position
    if(validNameAndPosition(req.body)) {
      res.status(405).json({ message: 'Validation exception' }) 
    } else {
      const status = await Player.updatePlayer(body)
      if(status === 404) res.status(404).json({ message: 'Player not found' })
      else res.status(200).end();
    }
  } else {
    res.status(400).json({ message: 'Invalid ID supplied' }) 
  }
};
