const mongoose = require('mongoose');

const playerShcema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  position: {
    type: String,
    enum: ['C', 'PF', 'SF', 'PG', 'SG']
  }
})

module.exports = mongoose.model('Player', playerShcema)