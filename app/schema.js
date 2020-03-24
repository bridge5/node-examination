const mongoose = require('./db');
const Schema = mongoose.Schema;

const playerSchema = new Schema({

    id: Number,
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        enum: ['C', 'PF', 'SF', 'PG', 'SG']
    }
})
const Plyaer = mongoose.model('player', playerSchema)
module.exports = Plyaer