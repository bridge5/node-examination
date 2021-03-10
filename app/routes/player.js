'use strict';

const express = require('express');
const router = express.Router();
const _ = require('lodash');
const playService = require('../modules/player');
const utils = require('../lib/utils');
const enums = require('../lib/enum');

// 创建球员
router.post('/', utils.reqHandler(async (req, res) => {
    const requestData = req.body;

    // 参数认证(简易)
    if (!_.isInteger(requestData.id) || !_.isString(requestData.name) || !_.isString(requestData.position)) {
        throw new Error('Invalid input');
    }

    if (requestData.id < 0 || !Object.values(enums.PlayerPosition).includes(requestData.position)) {
        throw new Error('Invalid input');
    }

    const result = await playService.postCreatePlayer(requestData);

    return res.json(utils.resJson(enums.Code.SUCCESS, 'ok', result));
}));

// 修改球员
router.put('/', utils.reqHandler(async (req, res) => {
    const requestData = req.body;

    // 参数认证(简易)
    if (!requestData.id || !_.isInteger(requestData.id) || requestData.id < 0) {
        throw new Error('Invalid ID supplied');
    }

    if (requestData.name && !_.isString(requestData.name)) {
        throw new Error('Validation exception');
    }

    if (requestData.position && (!_.isString(requestData.position) || !Object.values(enums.PlayerPosition).includes(requestData.position))){
        throw new Error('Validation exception');
    }

    const result = await playService.putUpdatePlayer(requestData);

    return res.json(utils.resJson(enums.Code.SUCCESS, 'ok', result));
}));

// 获取球员
router.get('/:playId', utils.reqHandler(async (req, res) => {
    const requestData = req.params || {};
    const playId = +requestData.playId;
    // 参数认证(简易)
    if (!playId || !_.isInteger(playId) || playId < 0) {
        throw new Error('Invalid ID supplied');
    }

    const result = await playService.getPlayer(playId);

    return res.json(utils.resJson(enums.Code.SUCCESS, 'ok', result));
}));

// 删除球员
router.delete('/:playId', utils.reqHandler(async (req, res) => {
    const requestData = req.params || {};
    const playId = +requestData.playId;
    // 参数认证(简易)
    if (!playId || !_.isInteger(playId) || playId < 0) {
        throw new Error('Invalid ID supplied');
    }

    const result = await playService.deletePlayer(playId);

    return res.json(utils.resJson(enums.Code.SUCCESS, 'ok', result));
}));

module.exports = router;