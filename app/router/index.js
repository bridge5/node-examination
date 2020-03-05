
/**
 * player router
 */

'use strict';

const index = require('../controller/index')

module.exports = app => {
    app.get('/', index.index);
}