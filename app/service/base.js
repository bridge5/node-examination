/**
 * base service
 */

'use strict'

const mongoose = require('../lib/mongoose')

class BaseService {
    get mongoose() {
        return mongoose;
    }
}


module.exports = BaseService