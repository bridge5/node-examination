const PlayerServices = require('../services/players')

module.exports = function(app) {
  app.route('/player')
    .post(PlayerServices.createPlayer)
    .put(PlayerServices.updatePlayer)

  app.route('/player/:id')
    .get(PlayerServices.findPlayer)
    .delete(PlayerServices.deletePlayer)
}