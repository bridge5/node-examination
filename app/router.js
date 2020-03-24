const Router = require('koa-router')
const player = require('./controller')

const router = new Router()
router.post('/player',player.add_player)
router.get('/player/:id',player.get_player)
router.put('/player',player.edit_player)
router.delete('/player/:id',player.del_player)

module.exports = router