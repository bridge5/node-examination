const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, enum: ['C', 'PF', 'SF', 'PG', 'SG'] },
  deletedAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Player', schema);
