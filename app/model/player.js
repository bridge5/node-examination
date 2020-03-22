'use strict';

const moment = require('moment');

const {Sequelize, pool} = require('../common/mysql');
const C = require('../common/constant');

const Player = pool.define('bas_player', {
  // 用户 player id
  playerId: {
    type: Sequelize.INTEGER,
    field: 'player_id',
    autoIncrement: true,
    primaryKey: true,
  },
  // 用户名称
  name: {
    type: Sequelize.STRING(32),
    field: 'name',
    unique: true,
  },
  // 年龄
  age: {
    type: Sequelize.INTEGER,
    field: 'age',
    unique: true,
  },
  // 手机号码
  phone: {
    type: Sequelize.STRING(32),
    field: 'phone',
    unique: true,
  },
  // 账号创建时间
  ctime: {
    type: Sequelize.DATE,
    field: 'ctime',
    defaultValue: moment().format('YYYY-MM-DD HH:mm:ss'),
  },
  // 修改时间
  mtime: {
    type: Sequelize.DATE,
    field: 'mtime',
    defaultValue: moment().format('YYYY-MM-DD HH:mm:ss'),
  },
  // 是否有效
  invaild: {
    type: Sequelize.CHAR(1),
    field: 'invaild',
    defaultValue: C.CHAR.NO,
  },
}, {
  // 启用时间
  timestamps: false,
  // 表注释
  comment: '用户基本信息表',
  freezeTableName: true,
});


/**
 * 创建用户数据
 * @param {Object} data
 */
exports.addPlayer = async (data) => {
  const res = await Player.create(
    data,
  );

  return res;
};


/**
 * 更新用户信息
 * @param {Object} where
 * @returns {Promise<[number, any[]]}
 */
exports.updatePlayer = async (data, where) => {
  const res = await Player.update(
    data,
    {
      where,
    },
  );

  return res;
};


/**
 * 获取用户信息
 * @param {Object} where
 */
exports.getPlayer = async (where) => {
  const res = await Player.findOne({
    where,
  });
  return res;
};