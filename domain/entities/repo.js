// eslint-disable-next-line no-undef
const envTable = `${process.env.TABLE_NAME}`;

export const playerRepo = {
  // column and table index
  TableName: `${envTable}-player`,

  // methods
  GetKey(playerId) {
    return { playerId };
  }
};
