'use strict';
const { Router } = require('express');
const playerRouter = require('../routes/player');

const router = Router();

router.use('/player', playerRouter);

module.exports = router;
