"use strict";

const db = require("../utils/mockDB.js");

/**
 * Create a new player
 *
 *
 * body Player Player object
 * no response value expected for this operation
 **/
exports.addPlayer = function(body) {
  return new Promise(function(resolve) {
    db.mockDB.push(body);
    resolve();
  });
};

/**
 * Deletes a player
 *
 *
 * playerId Long Player id to delete
 * no response value expected for this operation
 **/
exports.deletePlayer = function(playerId) {
  return new Promise(function(resolve, reject) {
    const playerIndex = db.mockDB.findIndex(player => player.id === playerId);
    if (playerIndex !== -1) {
      db.mockDB.splice(playerIndex, 1);
      resolve();
    } else {
      reject();
    }
  });
};

/**
 * Find player by ID
 * Returns a single player
 *
 * playerId Long ID of player to return
 * returns Player
 **/
exports.getPlayerById = function(playerId) {
  return new Promise(function(resolve, reject) {
    const player = db.mockDB.find(player => player.id === playerId);
    if (player) {
      resolve(player);
    } else {
      reject({ message: "No match user" });
    }
  });
};

/**
 * Update an existing player
 *
 *
 * body Player Player object that needs to be added to the team
 * no response value expected for this operation
 **/
exports.updatePlayer = function(body) {
  return new Promise(function(resolve, reject) {
    const playerIndex = db.mockDB.findIndex(player => player.id === body.id);
    if (playerIndex !== -1) {
      db.mockDB[playerIndex] = body;
      resolve();
    } else {
      reject();
    }
  });
};
