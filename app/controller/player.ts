import { mysqlConnect } from "../common/database/mysql"
import { httpCode } from "../common/httpCode/httpCode";

// Create a new player
export const createPlayer = async (req, res) => {
    const { name, position } = req.body;
    if (name == undefined || position == undefined) {
        res.status(405).json(httpCode.INVALIDINPUT);
        return
    }
    const sql = `insert into player (name, position) values ("${name}", "${position}")`;
    const data = await mysqlConnect(sql);
    const { insertId } = data;
    const player = {
        id: insertId,
        name,
        position
    }
    res.json(player);
}

// Update an existing player
export const updatePlayer = async (req, res) => {
    const { playerId, name, position } = req.body;
    if (playerId == undefined) {
        res.status(405).json(httpCode.INVALID);
        return
    }
    if (name == undefined || position == undefined) {
        res.status(405).json(httpCode.INVALIDINPUT);
        return
    }
    const sql = `update player set name = "${name}", position = "${position}" where id = "${playerId}"`;
    const data = await mysqlConnect(sql);
    const { affectedRows } = data
    if (affectedRows == 0) {
        res.status(404).json(httpCode.NOTFOUND);
        return
    }
    const player = {
        id: playerId,
        name,
        position
    }
    res.json(player);
}

// Find player by ID
export const getPlayer = async (req, res) => {
    const { playerId } = req.params;
    if (playerId == undefined) {
        res.status(405).json(httpCode.INVALID);
        return
    }
    const sql = `select * from player where id = ${playerId}`;
    const data = await mysqlConnect(sql);
    if (data.length == 0 ) {
        res.status(404).json(httpCode.NOTFOUND);
        return
    }

    res.json(data[0]);
}

export const deletePlayer = async (req, res) => {
    const { playerId } = req.params;
    if (playerId == undefined) {
        res.status(405).json(httpCode.INVALID);
        return
    }
    const sql = `delete from player where id = ${playerId}`;
    const data = await mysqlConnect(sql);
    const { affectedRows } = data
    if (affectedRows == 0) {
        res.status(404).json(httpCode.NOTFOUND);
        return
    }
    res.json({
        playerId
    })
}

