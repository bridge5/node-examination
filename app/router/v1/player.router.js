const express=require('express');
const playerController=require('../../controller/player.controller.js');
const router=express.Router();
router.post('/',(req,res)=>{
    playerController.addPlayer(req,res)
})
router.get('/:playerid',(req,res)=>{
    playerController.getPlayer(req,res)
})
router.put('/',(req,res)=>{
    playerController.updatePlayer(req,res)
})
router.delete('/:playerid',(req,res)=>{
    playerController.deletePlayer(req,res)
})

module.exports=router;
