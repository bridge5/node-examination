const mongoose = require('mongoose');

require('mongoose-long')(mongoose);

var Long = mongoose.Schema.Types.Long;

const PlayerSchema = mongoose.Schema({
    id: {
        type: Long,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    position: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Player', PlayerSchema);