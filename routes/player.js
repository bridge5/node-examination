const express = require('express');
const path = require('path');
const router = express.Router();
const Player = require(path.join(__dirname, '../db/models/player'));

router.post('/',
    async (req, res, next) => {
        await Player.create({name: req.body.name});

        return next();
    });

router.get('/:id',
    async (req, res, next) => {
        res.locals.data = await Player.find({_id: req.params.id});

        return next();
    });

router.put('/:id',
    async (req, res, next) => {
        res.locals.data = await Player.updateOne({_id: req.params.id}, {name: req.body.name});

        return next();
    });

router.delete('/:id',
    async (req, res, next) => {
        await Player.remove({_id: req.params.id});
        res.locals.data = {};
        return next();
    });

module.exports = router;
