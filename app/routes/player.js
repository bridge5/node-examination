const express = require('express');
const route = express.Router();
const Player = require('../schema/player')

const array = [ "C", "PF", "SF", "PG", "SG" ];

route.get('/',getAllPlayers)
route.get('/:id', getOnePlayer)
route.put('/', updatePlayer)
route.post('/', createPlayer)
route.delete('/:id', deletePlayer)

async function getAllPlayers(req,res){
  return res.send(await Player.find({}));
}

async function createPlayer(req, res){
  const {name,id,position}=req.body;
  if(name && (!isNaN(id)) && position && array.includes(position)){
      const result =await Player.create(req.body);
      return res.send(result);
  }
  return res.send('Invalid input');
}



async function updatePlayer(req, res){
  const {name,id,position}=req.body;
  if(!(name && position && (!isNaN(id))  && array.includes(position))){
    return res.send('Validation exception');
  }

  const player = await Player.findOne({id});
  if(!player){
    return res.send("Player not found");
  }
  player.name=name;
  player.position=position;
  await player.save();

  return res.send(player);
}


async function getOnePlayer (req, res) {
  const id = req.params.id;
  if(isNaN(id)){
    return res.send('invaliated Input');
  }
  const player = await Player.findOne({id});
  if(!player){
    return res.send("Player not found");
  }
   res.send(player);
}


async function deletePlayer(req, res) {
  const id = req.params.id;

  if(isNaN(id)){
    return res.send("Invalid ID supplied");
  }
  const player = await Player.findOne({id});
  if(!player){
    return res.send("Player not found");
  }
  await Player.findOneAndDelete({id},req.body)
  return res.send({status:0,message:"deleted"});
}


module.exports = route