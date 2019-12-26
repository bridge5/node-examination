import {
  findAllPlayers,
  findPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer
} from "../services/player_service";

export default {
  getAll: async (req, res, next) => {
    const players = await findAllPlayers();
    res.json(players);
  },
  getById: async (req, res, next) => {
    const { playerId } = req.params;
    const player = await findPlayerById(playerId);
    res.json(player);
  },
  create: async (req, res, next) => {
    const data = req.body;
    const result = await createPlayer(data);
    res.json(result);
  },
  update: async (req, res, next) => {
    const data = req.body;
    const result = await updatePlayer(data);
    res.json(result);
  },
  delete: async (req, res, next) => {
    const { playerId } = req.params;
    const result = await deletePlayer(playerId);
    res.json(result);
  }
};
