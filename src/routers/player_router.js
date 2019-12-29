import express from "express";
import player from "../controllers/player_controller";
import { playerIdSchema, playerSchema } from "../utils/validation_schema";
import { playerValidationErrors } from "../controllers/error_controller";

const router = express.Router();

router.get("/", player.getAll);

router.get("/:playerId", playerIdSchema, player.getById);

router.post("/", playerSchema, player.create);

router.put("/", playerSchema, player.update);

router.delete("/:playerId", playerIdSchema, player.delete);

router.use(playerValidationErrors);

export default router;
