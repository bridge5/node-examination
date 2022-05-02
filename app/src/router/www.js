const Router = require('koa-router'); // 引入koa-router
let router = new Router()
/*
* 玩家操作
* */
const player = require('../controller/playerController')
//添加
router.post('/player', player.addPlayer);
//删除
router.delete('/player/:id', player.deletePlayer);
//根据id获取单个信息
router.get('/player/:id', player.getPlayerById);
//更新
router.put('/player/:id', player.updatePlayer);
//列表
router.get('/player', player.list);

router.get('/',async (ctx)=>{
    ctx.$json(ctx,'success','首页')
})

module.exports = router
