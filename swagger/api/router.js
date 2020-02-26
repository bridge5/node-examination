const Router = require('koa-router');
const PlayerAPIs = require('./Player');

const PlayerControllers = require('./../controllers/Player');

// basePath
const router = new Router({
    prefix: '/v1',
  });

// 球员api路由
const PlayerRouter = new Router();

PlayerRouter
  // demo
  .get('/', PlayerAPIs.demoAPI)
  // 有ID参数时默认查询Player对象
  .param('player_id', PlayerAPIs.playerMiddleWare)
  // 添加球员
  .post('/', PlayerAPIs.addPlayer)
  // 修改球员 || 删除球员   /id/操作类型
  .post('/:player_id/:action_type', PlayerAPIs.playerActionAPI)
  // 根据id获取球员
  .get('/:player_id', PlayerAPIs.getPlayerById);

router.use('/player', PlayerRouter.routes(), PlayerRouter.allowedMethods());
module.exports = PlayerRouter;