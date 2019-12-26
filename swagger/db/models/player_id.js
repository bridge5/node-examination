const mongoose = require('mongoose');

const playerIdShcema = new mongoose.Schema({
  number: {
    type: Number,
    require: true
  },
  active: {
    type: Boolean,
    default: true
  }
})

module.exports = mongoose.model('PlayerId', playerIdShcema)