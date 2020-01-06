import { playerRepo } from "../entities/repo";
import dynamodb from "../../infra/dynamodb";
/**
 * @name createPlayer
 * @param { object } playerInfo
 * @returns { { createPlayerErr: error } }
 */
export async function createPlayer(playerInfo) {
  const eventHeader = "[createPlayer]";
  try {
    await dynamodb.call("put", {
      TableName: playerRepo.TableName,
      Item: playerInfo
    });
    return "";
  } catch (createPlayerErr) {
    return `${eventHeader} Error: createPlayerErr`;
  }
}
