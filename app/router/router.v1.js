const express=require('express');
const router=express.Router();
const playerRouter=require('./v1/player.router.js');

router.use('/player',playerRouter)
module.exports=router;


