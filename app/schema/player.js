const mongoose = require('mongoose');
const playerSchema = mongoose.Schema({
  name:{type:String},
  id:{type:Number},
  position:{type:String}
});




module.exports=mongoose.model('player',playerSchema);