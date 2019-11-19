const mongoose = require('mongoose');
const autoIncrementModelID = require('./Counter');

const playerSchema = mongoose.Schema({
  id: { 
    type: Number, 
    unique: true, 
    min: 0 
  },
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    enum: ['C', 'PF', 'SF', 'PG', 'SG'] 
  }
}, {
  versionKey: false
});

playerSchema.pre('save', function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  autoIncrementModelID('activities', this, next);
});

module.exports = mongoose.model('Player', playerSchema);
