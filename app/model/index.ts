

import { Model, Sequelize } from 'sequelize';
import { Player } from './mysql/Player';
import { join } from 'path';
import { readdirSync } from 'fs';



/**
 * 注册到框架上下文。key值请与文件名保持一致
 */
export interface CustomSequelize {
  Player: typeof Player;
}


export const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE!,
  process.env.MYSQL_USER!,
  process.env.MYSQL_PASSWORD!,
  {
    host: process.env.MYSQL_HOST!,
    logging: false,
    dialect: 'mysql',
  }
);

const initORM = async () => {
  const modelObj: Record<string, typeof Model> = {};
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  const path = join(__dirname, 'mysql');
  const modelFiles = readdirSync(path);
  modelFiles.length && modelFiles.map(fileName => {
    const key = fileName.split('.')[0];
    const model = require(join(path, fileName)).default;
    modelObj[key] = model();
  });
  await sequelize.sync();
  return modelObj;
};

export default initORM;
