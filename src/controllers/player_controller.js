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
    try {
      const { playerId } = req.params;
      const player = await findPlayerById(playerId);
      res.json(player);
    } catch (e) {
      next(e);
    }
  },
  create: async (req, res, next) => {
    try {
      const data = req.body;
      const result = await createPlayer(data);
      res.json(result);
    } catch (e) {
      next(e);
    }
  },
  update: async (req, res, next) => {
    try {
      const data = req.body;
      const result = await updatePlayer(data);
      res.json(result);
    } catch (e) {
      next(e);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { playerId } = req.params;
      const result = await deletePlayer(playerId);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
};
