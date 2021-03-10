'use strict';
const mongodber = require('../lib/mongodber');
const mongoPlayer = mongodber._db.player;

// 创建球员
async function postCreatePlayer(requestData){
    const  returnJson = {};

    const playInfo = await mongoPlayer.collection('Player').findOne({ id: requestData.id });
    if (playInfo) throw Error('Invalid input');

    await mongoPlayer.collection('Player').insertOne(requestData);

    return returnJson;
}

// 修改球员
async function putUpdatePlayer(requestData){
    const  returnJson = {};

    if (!requestData.name && !requestData.position){
        throw new Error('Validation exception');
    }

    const playInfo = await mongoPlayer.collection('Player').findOne({ id: requestData.id });
    if (!playInfo) throw Error('Player not found');

    const updateInfo = {};
    if (requestData.name) updateInfo.name = requestData.name;
    if (requestData.position) updateInfo.position = requestData.position;

    await mongoPlayer.collection('Player').updateOne({ id: requestData.id }, { $set: updateInfo });

    return returnJson;
}

// 获取球员
async function getPlayer(playId){
    const playInfo = await mongoPlayer.collection('Player').findOne({ id: playId });
    if (!playInfo) throw Error('Player not found');

    const  returnJson = {
        name: playInfo.name,
        id: playInfo.id,
        position: playInfo.position,
    };

    return returnJson;
}

// 删除球员
async function deletePlayer(playId){
    const returnJson = {};

    const playInfo = await mongoPlayer.collection('Player').findOne({ id: playId });
    if (!playInfo) throw Error('Player not found');

    await mongoPlayer.collection('Player').deleteOne({ id: playId });

    return returnJson;
}

module.exports = {
    postCreatePlayer,
    putUpdatePlayer,
    getPlayer,
    deletePlayer,
};