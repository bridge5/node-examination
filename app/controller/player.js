/*
 * player controller
 */
'use strict';

const playerService = require('../service/player')

class Player { 

    /**
     * add a player
     */
    async addPlayer(req, res) {
        const { name, id, position } = req.body
        if ((typeof(name)) === 'undefined' || (typeof(id) === 'undefined') || (typeof(position) === 'undefined')) {
            throw new Error('invalid_input')
        }
        const result = await playerService.addPlayer({ name, id, position })
        res.json({ code: 200, msg: 'success', data: result })
    }

    /**
     * update a player
     */
    async updatePlayer(req, res) {
        const { name, id, position } = req.body
        if ((typeof(name)) === 'undefined' || (typeof(id) === 'undefined') || (typeof(position) === 'undefined')) {
            throw new Error('invalid_input')
        }
        if (id < 0 || isNaN(Number(id)) ) {
            throw new Error('invalid_id_supplied')	
        }
        const result = await playerService.updatePlayer({ name, id, position })
        res.json({ code: 200, msg: 'success', data: result })
    }

    /**
     * get a player by id
     */
    async getPlayerById(req, res, next) {
        const { id } = req.params
        if ((typeof(id) === 'undefined')) {
            throw new Error('invalid_input')
        }
        if (id < 0 || isNaN(Number(id)) ) {
            throw new Error('invalid_id_supplied')	
        }
        const result = await playerService.findOnePlayer({ id })
        res.json({ code: 200, msg: 'success', data: result })
    }

    /**
     * delete a player
     */
    async deletePlayer(req, res) {
        const { id } = req.params;
        if ((typeof(id) === 'undefined')) {
            throw new Error('invalid_input')
        }
        if (id < 0 || isNaN(Number(id)) ) {
            throw new Error('invalid_id_supplied')	
        }
        const result = await playerService.deleteOnePlayer({ id })
        res.json({ code: 200, msg: 'success', data: result })
    }


}

module.exports = new Player();