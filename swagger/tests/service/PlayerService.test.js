const db = require("../../utils/mockDB.js");
const Player = require("../../service/PlayerService");

describe("PlayerService test", () => {
  it("should addPlayer correctly", () => {
    expect(db.mockDB.length).toBe(1);
    Player.addPlayer({
      name: "Kobe",
      id: 1,
      position: "SG"
    });
    expect(db.mockDB.length).toBe(2);
  });

  it("should deletePlayer correctly", () => {
    expect(db.mockDB.length).toBe(2);
    Player.deletePlayer(2).catch(console.error);
    expect(db.mockDB.length).toBe(2);
    Player.deletePlayer(1);
    expect(db.mockDB.length).toBe(1);
  });

  it("should getPlayerById correctly", () => {
    Player.getPlayerById(0).then(player => {
      expect(player.id).toBe(0);
      expect(player.name).toBe("LeBron");
      expect(player.position).toBe("C");
    });
    Player.getPlayerById(1).catch(error =>
      expect(error.message).toBe("No match user")
    );
  });

  it("should updatePlayer correctly", () => {
    Player.updatePlayer({
      name: "LeBron",
      id: 0,
      position: "SF"
    }).then(() => {
      Player.getPlayerById(0).then(player => {
        expect(player.id).toBe(0);
        expect(player.name).toBe("LeBron");
        expect(player.position).toBe("SF");
      });
    });

    Player.updatePlayer({
      name: "LeBron",
      id: 1,
      position: "SF"
    }).catch(console.error);
  });
});
