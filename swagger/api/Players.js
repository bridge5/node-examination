const express = require('express');
const router = express.Router();
const PlayController = require('../controllers/Player')

/**
 * Create a new player
 */
router.post('/', (req, res, next) => {
  PlayController.addPlayer(req, res, next);
})

/**
 * Update an existing player
 */
router.put('/', (req, res, next) => {
  PlayController.updatePlayer(req, res, next);
})

/**
 * Find player by ID
 */
router.get('/:playerId', (req, res, next) => {
  PlayController.getPlayerById(req, res, next);
})

/**
 * Deletes a players
 */
router.delete('/:playerId', (req, res, next) => {
  PlayController.deletePlayer(req, res, next);
})


module.exports = router;