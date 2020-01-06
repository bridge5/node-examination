import createPlayer from "./app/players/createPlayer";

module.exports = app => {
  app.put("/player", createPlayer.main);
  app.post("/player", createPlayer.main);
  app.delete("/player/{playerId}", createPlayer.main);
  app.post("/player/{playerId}", createPlayer.main);
};
