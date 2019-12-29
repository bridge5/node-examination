import Player from "../dao/player";

export const findAllPlayers = async () => {
  const players = await Player.find();
  return players;
};

export const findPlayerById = async id => {
  const player = await Player.findOne({ id });
  return player;
};

export const createPlayer = async doc => {
  const result = await Player.create(doc);
  return result;
};

export const updatePlayer = async doc => {
  const result = await Player.updateOne({ id: doc.id }, doc);
  return result;
};

export const deletePlayer = async id => {
  const result = await Player.deleteOne({ id });
  return result;
};
