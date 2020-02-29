const express = require('express');
const db = require('../lib/database');
const util = require('../utils');

const log = util.log;

const router = express.Router();

function checkParameter(data) {
    if(data.hasOwnProperty('id') && data.hasOwnProperty('name') && data.hasOwnProperty('position')) {
        return true;
    }
    return false;
}

router.post('/', async (req, res) => {
    let payload = {};

    if(req.headers['content-type'] === 'application/xml') {
        if(!checkParameter(req.body.Player)) {
            res.status(405).send();
            return;
        } else {
            payload.id = req.body.Player['id'][0];
            payload.name = req.body.Player['name'][0];
            payload.position = req.body.Player['position'][0];
        }
    } else {
        if(!checkParameter(req.body)) {
            res.status(405).send();
            return;
        } else {
            payload.id = req.body.id
            payload.name = req.body.name;
            payload.position = req.body.position;
        }
    }

    await db.Table.Player.create([
        {
            id: payload.id,
            name: payload.name,
            position: payload.position
        }
    ], (err, ret) => {
        if(err) {
            log(`Add player failed. [${err}]`);
            res.status(405).send();
            return;
        }
        res.status(200).send();
    });
});

router.put('/', async (req, res) => {
    let payload = {};

    if(req.headers['content-type'] === 'application/xml') {
        if(!checkParameter(req.body.Player)) {
            res.status(405).send();
            return;
        } else {
            payload.id = req.body.Player['id'][0];
            payload.name = req.body.Player['name'][0];
            payload.position = req.body.Player['position'][0];
        }
    } else {
        if(!checkParameter(req.body)) {
            res.status(405).send();
            return;
        } else {
            payload.id = req.body.id
            payload.name = req.body.name;
            payload.position = req.body.position;
        }
    }

    await db.Table.Player.findOneAndUpdate({id: payload.id}, payload, (err, ret) => {
        if(err) {
            log(`Update player failed. [${err}]`);
            res.status(405).send();
            return;
        }
        if(ret === null) {
            res.status(404).send();
            return;    
        }
        res.status(200).send();
    });
});

router.get('/:id', async (req, res) => {
    if(!req.params.hasOwnProperty('id')) {
        res.status(400).send();
        return;
    }

    await db.Table.Player.findOne({ id: req.params.id }, (err, ret) => {
        if(err) {
            log(`Get player failed. [${err}]`);
            res.status(400).send();
            return;
        }
        if(ret == null) {
            res.status(404).send();
            return;
        }
        res.send({
            id: ret.id,
            name: ret.name,
            position: ret.position
        });
    });
});

router.delete('/:id', async (req, res) => {
    if(!req.params.hasOwnProperty('id')) {
        res.status(400).send();
        return;
    }

    await db.Table.Player.deleteOne({ id: req.params.id }, (err, ret) => {
        if(err) {
            log(`Delete player failed. [${err}]`);
            res.status(400).send();
            return;
        }
        if(ret.deletedCount === 0) {
            res.status(404).send();
            return;
        }
        res.sendStatus(200);
    });
});

module.exports = router;