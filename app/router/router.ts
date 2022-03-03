import * as express from 'express';
import { createPlayer, updatePlayer, getPlayer, deletePlayer } from '../controller/player';

const router=express.Router();

router.post('/player', createPlayer)

router.put('/player', updatePlayer)

router.get('/player/:playerId', getPlayer)

router.delete('/player/:playerId', deletePlayer)

export default router;