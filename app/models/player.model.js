const mongoose = require('mongoose');

const PlayerSchema = mongoose.Schema({
    id: {
        type: Number,
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