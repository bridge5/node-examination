const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    name: {type: String},
    position: {type: String}
});

PlayerSchema.plugin(mongoosePaginate);
PlayerSchema.plugin(beautifyUnique);

const Player = mongoose.model('player', PlayerSchema);

module.exports = Player;
