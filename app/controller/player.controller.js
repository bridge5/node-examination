const db=require('../lib/mongo.lib.js');
const common=require('../lib/common.js');
const conllection=`player`;
const {RESPONSE}=require('config-lite')(__dirname);

/**
 * add player
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let addPlayer=async function(req,res){
    let {name,id,position}=req.body;
    if(!name||!position||id*1<0||isNaN(id*1)){
        res.send(RESPONSE.INVALIDINPUT);
    }
    let result =await db.insertOne(conllection,req.body);
    res.send(RESPONSE.SUCCESS);
}

/**
 * get player by id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let getPlayer=async function(req,res){
    let {SUCCESS}=RESPONSE;
    let {playerid}=req.params;
    if(playerid*1<0||isNaN(playerid*1)){
        res.send(RESPONSE.INVALIDIDSUPPLIED);
        return;
    }
    let result =await  db.find(conllection,{id:playerid*1});
    if(result.length<=0){
        res.send(RESPONSE.PLAYERNOTFOUND);
        return;
    }
    let success=common.apiSuccess(RESPONSE.SUCCESS,result)
    res.send(success);

}

/**
 * update player by id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let updatePlayer=async function(req,res){
    let {name,id,position}=req.body;
    if(id*1<0||isNaN(id*1)){
        res.send(RESPONSE.INVALIDIDSUPPLIED);
        return;
    }
    let getUserResult =await  db.find(conllection,{id:id*1});
    if(getUserResult.length<=0){
        res.send(RESPONSE.PLAYERNOTFOUND);
        return;
    }
    let result =await  db.update(conllection,{id:id},{$set:{name,position}});
    res.send(RESPONSE.SUCCESS);
}

/**
 * delete player by id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let deletePlayer=async function(req,res){
    let {SUCCESS}=RESPONSE;
    let {playerid}=req.params;
    if(playerid*1<0||isNaN(playerid*1)){
        res.send(RESPONSE.INVALIDIDSUPPLIED);
        return;
    }
    let getUserResult =await  db.find(conllection,{id:playerid*1});
    if(getUserResult.length<=0){
        res.send(RESPONSE.PLAYERNOTFOUND);
        return;
    }
    let deleteUserResult=await  db.deleteOne(conllection,{id:playerid*1});
    res.send(RESPONSE.SUCCESS)
}

module.exports={
    addPlayer,
    getPlayer,
    updatePlayer,
    deletePlayer
}
