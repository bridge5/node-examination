/**
 * player service
 */

'use strict'

const baseService = require('./base')

class PlayerService  extends baseService{
    constructor() {
        super()
    }

    async addPlayer({ name, id, position }) {
        const player = await this.mongoose.model('Player').findOne({ name, id }).lean();
        if (player) {
            throw new Error('player_already_exists')
        }
        const result = await this.mongoose.model('Player').create({ name, id, position });
        return result;
    }

    async updatePlayer({ name, id, position }) {
        const player = await this.mongoose.model('Player').findOne({ name, id }).lean();
        if (!player) {
            throw new Error('player_not_find')
        }
        const result = await this.mongoose.model('Player').findOneAndUpdate(
            { id },
            { name, position },
            { new: true, runValidators: true }
        );
        return result;
    }

    async findOnePlayer({ id }) {
        const player = await this.mongoose.model('Player').findOne({ id }).lean();
        if (!player) {
            throw new Error('player_not_find')
        }
        return player;
    }

    async deleteOnePlayer({ id }) {
        const player = await this.mongoose.model('Player').findOneAndDelete({ id });
        if (!player) {
            throw new Error('player_not_find')
        }
        return player;
    }
}


module.exports = new PlayerService()