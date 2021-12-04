/*
 * @Description:player模型
 */
const mongoose = require('mongoose')
const { String } = mongoose.SchemaTypes
const { PLAYERPOSITION } = require('../configs/constant')

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50
  },
  position: {
    type: String,
    required: true,
    enum: PLAYERPOSITION,
  },
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  }
})

module.exports = mongoose.model('Player', playerSchema, 'player')
