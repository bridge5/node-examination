'use strict';

const {playerCtrl} = require('../controller');

module.exports = [
  {
    method: 'post',
    path: '/player',
    controller: playerCtrl.addPlayer,
  },
  {
    method: 'put',
    path: '/player/:id',
    controller: playerCtrl.updatePlayer,
  },
  {
    method: 'delete',
    path: '/player/:id',
    controller: playerCtrl.deletePlayer,
  },
  {
    method: 'get',
    path: '/player/:id',
    controller: playerCtrl.getPlayer,
  },
];
