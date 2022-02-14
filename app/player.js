'use strict';

const db = require('../lib/mongodb.js');
const RES = require('../config/config.js').RES;
const conllection = `NBA`;
const Enum = [ 'C', 'PF', 'SF', 'PG', 'SG' ];
 let addPlayer = async function addPlayer (req, res, next) {
  let {id,name,position}=req.body;
  if(!name||!position||!id || id*1 < 0){
      res.send(RES.INVALIDINPUT);
      return;
  }
  if(Enum.indexOf(position) == -1){
    res.send(RES.VALIDATIONEXCEPTION);
    return;
  }
    await db.insertOne(conllection,{id,name,position});
    res.send(RES.SUCCESS);
};

 let deletePlayer = async function deletePlayer (req, res, next) {
  let {playerid}=req.params;
  if(playerid == '' || playerid == null){
      res.send(RES.INVALIDIDSUPPLIED);
      return;
  }
  let getUserResult = await db.find(conllection,{id:playerid});
  if(getUserResult.length <= 0){
      res.send(RES.PLAYERNOTFOUND);
      return;
  }
   await db.deleteOne(conllection,{id:playerid});
  res.send(RES.SUCCESS)
};

 let getPlayerById = async function getPlayerById (req, res, next) {
    let {playerid} = req.params;
    let whereObject = '';
    if(playerid !='' && playerid != null && playerid*1 >0){        
        whereObject = {id:playerid};
    }
    let result = await db.find(conllection,whereObject);
    if(result.length <= 0){
        res.send(RES.PLAYERNOTFOUND);
        return;
    }
    let success = RES.SUCCESSANDDATA;
    success.data = result;
    res.send(success);

};

let updatePlayer = async function updatePlayer (req, res, next) {
  let {id,name,position}=req.body;
    if(id == '' || id === null || id*1<0){
        res.send(RES.INVALIDIDSUPPLIED);
        return;
    }
    let result = await db.find(conllection,{id:id});
    if(result.length<=0){
        res.send(RES.PLAYERNOTFOUND);
        return;
    }
    console.log(position)
    console.log(Enum.indexOf(position))
    if(Enum.indexOf(position) == -1){
        res.send(RES.VALIDATIONEXCEPTION);
        return;
      }
     await db.update(conllection,{id:id},{$set:{name,position}});
    res.send(RES.SUCCESS);

};
module.exports ={
  addPlayer,
  deletePlayer,
  getPlayerById,
  updatePlayer
}