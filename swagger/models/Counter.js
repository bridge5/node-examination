const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const counterSchema = new Schema({
  _id: {
    type: String, 
    required: true
  },
  seq: { 
    type: Number, 
    default: 0 
  }
});

counterSchema.index({ _id: 1, seq: 0 }, { unique: true })

const counterModel = mongoose.model('counter', counterSchema);

const autoIncrementModelID = function (modelName, doc, next) {
  counterModel.findByIdAndUpdate(
    modelName,                           
    { $inc: { seq: 1 } },                
    { new: true, upsert: true },         
    function(error, counter) {           
      if(error) return next(error);

      doc.id = counter.seq - 1;
      next();
    }
  );                                   
}

module.exports = autoIncrementModelID;