const Route = require('koa-route');
const PlayerController = require('./controller/player');
module.exports = app => {
    app.use(Route.get('/v1/player/:playerId',async (ctx,playerId) => {
        await PlayerController.findPlayer(ctx,playerId);
    }));
    app.use(Route.post('/v1/player',async (ctx) => {
        await PlayerController.createPlayer(ctx);

    }));
    app.use(Route.put('/v1/player', async (ctx) => {
       await PlayerController.updatePlayer(ctx);
    }));
    app.use(Route.delete('/v1/player/:playerId', async(ctx,playerId) => {
       await PlayerController.deletePlayer(ctx,playerId);
    }));
}