import express from "express";
import { validationResult } from "express-validator";
import { playerIdSchema, playerSchema } from "../utils/validation_schema";
import player from "../controllers/player_controller";

const router = express.Router();

router.get("/", player.getAll);

router.get("/:playerId", playerIdSchema, player.getById);

router.post("/", playerSchema, player.create);

router.put("/", playerSchema, player.update);

router.delete("/:playerId", playerIdSchema, player.delete);

router.use((err, req, res, next) => {
  const errors = validationResult(req).formatWith(({ param, msg }) => ({
    [param]: msg
  }));
  if (!errors.isEmpty())
    res.status(405).json(errors.array({ onlyFirstError: true }));
  else res.status(400).json({ errors: "something went wrong" });
});

export default router;
