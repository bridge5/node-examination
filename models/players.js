const mongoose = require('../db')

const PlayerSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    validate:{
      validator: function(id){
        return !isNaN(id)
      },
      message: 'Invalid Input!'
    }
  },
  name: {
    type: String,
    required: true,
    validate:{
      validator: function(name){
        return typeof name === 'string'
      },
      message: 'Invalid Input!'
    }
  },
  position: {
    type: String,
    required: true,
    enum: ['PG', 'SG', 'SF','PF', 'C']
  }
})

PlayerSchema.pre('save', function(next){
  const self = this;
  Players.findOne({id: this.id}, 'id', function(err, result){
    if (err){
      next(err);
    } else if (result){
      self.invalidate('id', 'id must be unique');
      next(new Error('id must be unique'));
    } else {
      next();
    }
  })
})

const Players = mongoose.model('Players', PlayerSchema);

module.exports = Players;