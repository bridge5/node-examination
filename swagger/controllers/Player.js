'use strict';

const utils = require('../utils/writer.js');
const Player = require('../service/PlayerService');

const initResObj = (statusCode = 200, msg = 'success') => {
  return { 
    code: statusCode,
    payload: {
      message : msg 
    }
  }
}

module.exports.addPlayer = function addPlayer (req, res, next) {
  const body = req.body;
  Player.addPlayer(body)
    .then(response => {
      let resObj = initResObj();
      utils.writeJson(res, resObj.payload, resObj.code);
    })
    .catch(error => {
      let errObj = initResObj(400, 'Bad request');

      if (error.name === 'ValidationError') {
        errObj = initResObj(405, 'Invalid Input');
      }

      utils.writeJson(res, errObj.payload, errObj.code);
    });
};

module.exports.deletePlayer = function deletePlayer (req, res, next) {
  const playerId = req.params.playerId;
  Player.deletePlayer(playerId)
    .then(response => {
      const delCount = response.deletedCount;
      let resObj = initResObj();

      if ( 0 === delCount ) {
        resObj = initResObj(404, 'Player not found');
      }

      utils.writeJson(res, resObj.payload, resObj.code);
    })
    .catch(error => {
      let errObj = initResObj(400, 'Invalid ID supplied');
      utils.writeJson(res, errObj.payload, errObj.code);
    });
};

module.exports.getPlayerById = function getPlayerById (req, res, next) {
  const playerId = req.params.playerId;
  Player.getPlayerById(playerId)
    .then(response => {
      const { id, name, position } = response;
      let resObj = initResObj();

      utils.writeJson(res, Object.assign({}, resObj.payload, {
          id: id,
          name: name,
          position: position
      }, resObj.code));
    })
    .catch(error => {
      let errObj = initResObj(404, 'Player not found');

      if ('id' === error.path) {
        errObj = initResObj(400, 'Invalid ID supplied');
      }

      utils.writeJson(res, errObj.payload, errObj.code);
    });
};

module.exports.updatePlayer = function updatePlayer (req, res, next) {
  const body = req.body;
  Player.updatePlayer(body)
    .then(response => {
      const modCount = response.nModified;
      let resObj = initResObj();

      if ( 0 === modCount ) {
        resObj = initResObj(404, 'Player not found');
      }

      utils.writeJson(res, resObj.payload, resObj.code);
    })
    .catch(error => {
      let errObj = initResObj(400, 'Bad request');

      if ('id' === error.path) {
        errObj = initResObj(400, 'Invalid ID supplied');
      }

      if (error.name === 'ValidationError') {
        errObj = initResObj(405, 'Validation exception');
      }

      utils.writeJson(res, errObj.payload, errObj.code);
    });
};
