import should from "should";
import { MongoMemoryServer } from "mongodb-memory-server";
import { mongodbUri } from "../src/dao/database/config";
import { connectDatabase } from "../src/dao/database/mongodb";
import {
  createPlayer,
  findPlayerById,
  updatePlayer,
  deletePlayer
} from "../src/services/player_service";

describe("#NBA player RESTful API", async () => {
  before(async () => {
    const mongod = new MongoMemoryServer();
    const uri = await mongod.getConnectionString();
    mongodbUri.test = uri;
    connectDatabase();
  });

  it("should return a object when the player has been created", async () => {
    const doc = {
      id: 123,
      name: "Wade",
      position: "PG"
    };
    const player = await createPlayer(doc);
    should(player).have.property("id", 123);
    should(player).have.property("name", "Wade");
    should(player).have.property("position", "PG");
  });

  it("should return a object of the player 123", async () => {
    const player = await findPlayerById(123);
    should(player).have.property("id", 123);
    should(player).have.property("name", "Wade");
    should(player).have.property("position", "PG");
  });

  it("should return a object when the player has been updated", async () => {
    const doc = {
      id: 123,
      name: "LeBron",
      position: "PF"
    };
    const result = await updatePlayer(doc);
    should(result).have.property("n", 1);
    should(result).have.property("nModified", 1);
  });

  it("should return a object when the player has been deleted", async () => {
    const result = await deletePlayer(123);
    should(result).have.property("n", 1);
    should(result).have.property("deletedCount", 1);
  });
});
