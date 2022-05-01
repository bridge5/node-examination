'use strict';
module.exports = app => {
  app.post('/v1/player', app.controller.player.create);
  app.put('/v1/player', app.controller.player.update);
  app.get('/v1/player/:playerId', app.controller.player.findOne);
  app.delete('/v1/player/:playerId', app.controller.player.del);
  app.post('/v1/test', app.controller.player.test);
};
