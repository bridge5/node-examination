const Players = require('../models/players')

const createPlayer = (req, res) => {
  const Player = new Players({
    id: req.body.player? req.body.player.id[0] : req.body.id,
    name: req.body.player? req.body.player.name[0] : req.body.name,
    position: req.body.player? req.body.player.position[0] : req.body.position
  });
  Player.save()
        .then(() =>{
          res.end();
        })
        .catch((err) => {
          res.status(405).send({message: 'Invalid Input'});
        })
}

const updatePlayer = (req, res) => {
  const updateObj = {};
  const id = req.body.player ? req.body.player.id : req.body.id
  const name = req.body.player ? req.body.player.name : req.body.name
  const position = req.body.player ? req.body.player.position : req.body.position
  if (isNaN(id)) {
    res.status(400).send({message: 'Invalid ID Supplied'});
    return;
  }
  if (name){
    updateObj.name = name;
  }
  if (position){
    updateObj.position = position;
  }
  Players.findOneAndUpdate({id: id},updateObj, {runValidators: true}).exec()
        .then((result) =>{
          if (!result){
            res.status(404).send({message: 'Player Not Found'});
          }
          res.end();
        })
        .catch((err) => {
          res.status(405).send({message: 'Validation Exception'});
        })
}

const deletePlayer = (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).send({message: 'Invalid ID Supplied'});
    return
  }
  Players.findOneAndDelete({id: req.params.id}).exec()
        .then((result) =>{
          if (!result){
            res.status(404).send({message: 'Player Not Found'});
          }
          res.end();
        })
        .catch((err) => {
          res.status(404).send({message: 'Player Not Found'});
        })
}

const findPlayer = (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).send({message: 'Invalid ID Supplied'});
    return
  }
  Players.findOne({id: req.params.id}).exec()
        .then((result) =>{
          if (!result){
            res.status(404).send({message: 'Player Not Found'});
          }
          else {
            res.send({
              id: result.id,
              name: result.name,
              position: result.position
            });
          }
        })
        .catch((err) => {
          res.status(404).send({message: 'Player Not Found'});
        })
}

exports.createPlayer = createPlayer
exports.updatePlayer = updatePlayer
exports.deletePlayer = deletePlayer
exports.findPlayer = findPlayer