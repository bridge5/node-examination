/**
 * player model
 */

'use strict';

const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    id: {
        type: Number,
    },
    position: {
        type: String,
        enum: ['C', 'PF', 'SF', 'PG', 'SG']
    }
});

module.exports = {
    modelName: 'Player',
    schema: PlayerSchema,
    tableName: 'player'
};
