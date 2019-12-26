import express from "express";
import player from "../controllers/player_controller";

const router = express.Router();

router.get("/", player.getAll);

router.get("/:playerId", player.getById);

router.post("/", player.create);

router.put("/", player.update);

router.delete("/:playerId", player.delete);

export default router;