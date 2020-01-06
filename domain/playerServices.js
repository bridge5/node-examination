import commandEvent from "./event/commandEvent";
/**
 * @name createPlayerService
 * @param { object } playerInfo
 * @returns { { createPlayerServiceErr: error } }
 */
export async function createPlayerService(playerInfo) {
  const { createPlayer } = commandEvent;
  const { createPlayerErr } = await createPlayer(userList);
  if (createPlayerErr) return { createPlayerErr };
  return "";
}
