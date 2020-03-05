/**
 * error map
 */

'use strict';

const format = (code, data = '') => {
    return { code, data };
};

module.exports = {
    invalid_id_supplied: format(400, 'Invalid ID supplied'),
    player_not_find: format(404, 'Player not found'),
    invalid_input: format(405, 'Invalid input'),
    player_already_exists: format(405, 'Invalid input: The player already exists ... '),
    ValidationError: format(405, 'Validation exception: positon'),
};