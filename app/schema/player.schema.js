const { Schema } = require('mongoose');

let PlayerSchema = new Schema({
    id: { type: Number },
    name: { type: String },
    position: { type: String, enum: ['C', 'PF', 'SF', 'PG', 'SG'] }
});

module.exports = PlayerSchema;