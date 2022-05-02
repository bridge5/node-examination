

import { Model, INTEGER, STRING } from 'sequelize';
import { sequelize } from '../index';


export class Player extends Model {
  declare id: number;
  name: string;
  position: 'C' | 'PF' | 'SF' | 'PG' | 'SG';
}

export default () => {
  return Player.init({
    id: {
      field: 'FPlayerId',
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      field: 'FPlayerName',
      type: STRING(20),
    },
    position: {
      field: 'FPlayerPosition',
      type: STRING(2),
    }
  }, {
    sequelize,
    tableName: 'T_Player',
  });
}
