/**
 * player router
 */

'use strict';
const { wrap } = require('../lib/util')
const player = require('../controller/player')

module.exports = app => {
    app.post('/v1/player', wrap(player.addPlayer));
    app.put('/v1/player', wrap(player.updatePlayer));
    app.get('/v1/player/:id', wrap(player.getPlayerById));
    app.delete('/v1/player/:id', wrap(player.deletePlayer));
} 