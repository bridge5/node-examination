const express=require('express');
const playerController=require('../../controller/player.js');
const router=express.Router();
router.post('/',(req,res)=>{
    playerController.addPlayer(req,res)
})
router.delete('/:playerid',(req,res)=>{
    playerController.deletePlayer(req,res)
})
router.get('/:playerid',(req,res)=>{
    playerController.getPlayerById(req,res)
})
router.get('/',(req,res)=>{
    playerController.getPlayerById(req,res)
})
router.put('/',(req,res)=>{
    playerController.updatePlayer(req,res)
})


module.exports=router;
