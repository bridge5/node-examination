const express = require('express');
const router = express.Router();
const PlayController = require('../controllers/Player');

// create player
router.post('/', (res, req, next) => {
  PlayController.addPlayer(res, req, next)
})
// delete player
router.delete('/:playerId', (res, req, next) => {
  PlayController.deletePlayer(res, req, next)
})
// get player
router.get('/:playerId', (res, req, next) => {
  PlayController.getPlayerById(res, req, next)
})
// update player
router.put('/', (res, req, next) => {
  PlayController.updatePlayer(res, req, next)
})

module.exports = router