const mongoose = require('mongoose');
const uuid = require('uuid');

const { Schema } = mongoose;
/**
 * 球员管理相关 models(MongoDB) 200223
 * @author DZJ <duanzhenjie964@qq.com>
 */

/* 定义员工schema */
const PlayersSchema = new Schema({
  name: String,
  position: {
    type: String,
    enum : ['C','PF','SF','PG','SG']
  },
});

/**
 * 新建记录
 * @param {Object} playerData
 */
PlayersSchema
  .statics
  .addNew = async function addNew(
    playerData,
  ) {
    const newData = {
      name: playerData.name,
      position: playerData.position,
      add_datetime: new Date(),
    };
    const newObj = new this(newData);
    await newObj.save();
    return newObj;
  };

const Players = mongoose.model('Players', PlayersSchema, 'players');

const makeup = {
    Players: Players,
};

module.exports = makeup;