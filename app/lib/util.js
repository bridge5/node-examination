/*
 * Util
 */

'use strict';

class Util {
    /**
     * execute wrap
     * @param {Function} fn controller
     */
    wrap(fn) {
        return (...args) => fn(...args).catch(args[2])
    }

    /**
     * check mongodb id
     * @param {String} id Object ID
     */
    validateId(id) {
        return id ? mongoose.Types.ObjectId.isValid(String(id)) : false;
    }
}

module.exports = new Util();