module.exports = (app) => {
    const players = require('../controllers/player.controller.js');

    // Create a new player
    app.post('/player', players.create);

    // Get all players
    app.get('/players', players.findAll);

    // Find player by ID
    app.get('/player/:playerId', players.findOne);

    // Update player
    app.put('/player', players.update);

    // Delete player by ID
    app.delete('/player/:playerId', players.delete);
}