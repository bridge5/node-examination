/*
 * @Description: 路由模块
 */
const koaRouter = require('koa-router')
const router = new koaRouter()

// 引入验证器，模型
const validator = require('../middlewares/validator')
const playerSchema = require('../schemas/player')

const playerController = require('../controllers/player')

router.get('/players', playerController.list)
router.post('/players', validator(playerSchema.createBody), playerController.create)
router.get('/players/:id', playerController.detail)
router.put('/players/:id', validator(playerSchema.updateBody), playerController.update)
router.delete('/players/:id', playerController.del)



module.exports = router
