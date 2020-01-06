import { createPlayerService } from "../../domain/playerServices";
module.exports = {
  async main(req, res, next) {
    try {
      const playerInfo = req.body;
      const createPlayerServiceErr = await createPlayerService(playerInfo);
      if (createPlayerServiceErr) throw new Error(createPlayerServiceErr);
    } catch (err) {
      next(err);
    }
  }
};
