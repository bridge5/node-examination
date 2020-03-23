const Player = require('../models/playerModel');

// show a player
exports.show = async function(req, res, next) {
  let { id } = req.params;

  const player = await Player.findOne({ _id: id, deletedAt: undefined });

  if (!player) {
    return res.status(404).end('player not found');
  }

  res.json({
    id: player.id,
    name: player.name,
    position: player.position
  });
};

// create a player
exports.create = function(req, res, next) {
  const { name, position } = req.body;

  const player = new Player({ name, position });

  player.save((err, player) => {
    if (err) return next(err);

    res.json({
      id: player.id,
      name: player.name,
      position: player.position
    });
  });
};

// update a player
exports.update = async function(req, res, next) {
  let { id } = req.params;
  let { name, position } = req.body;

  const player = await Player.findOne({ _id: id, deletedAt: undefined });

  if (!player) {
    return res.status(404).end('player not found');
  }

  player.name = name;
  player.position = position;

  player.save((err, player) => {
    if (err) return next(err);

    res.json({
      id: player.id,
      name: player.name,
      position: player.position
    });
  });
};

// soft delete a player
exports.delete = async function(req, res, next) {
  let { id } = req.params;

  const player = await Player.findOne({ _id: id, deletedAt: undefined });

  if (!player) {
    return res.status(404).end('player not found');
  }

  player.deletedAt = new Date();

  player.save((err, player) => {
    if (err) return next(err);

    res.json({
      id: player.id,
      name: player.name,
      position: player.position
    });
  });
};
