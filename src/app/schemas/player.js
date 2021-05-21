let config   = require('../../config');
let mongoose = require('mongoose');
let db       = require('../libs/mongoose');

let collectionSchema = new mongoose.Schema({
  id: {
    type: Number, //TODO: use NumberLong for int64
    unique: true,
    index: true,
    required: true,
    min: 0,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  position: {
    type: String,
    required: true,
    enum: require('../constants').positionENUM,
  },
}, {
  timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'},
  writeConcern: config.mongoWriteConcern,
  collection: 'player',
});

const collectionModel = db.model('player', collectionSchema);

module.exports = collectionModel;
