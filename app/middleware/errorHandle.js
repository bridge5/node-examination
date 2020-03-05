/**
 * error handle
 */

'use strict'

const errorMap = require('../config/error.map')

module.exports = function (err, req, res, next) {
    if (err) {
        let code = 500;
        let data = 'serve error';
        if (err.name === 'ValidationError') {
            data =  errorMap[err.name].data
            code = errorMap[err.name].code
        }
        const errMsg = err.message

        if (errorMap[errMsg]) {
            code = errorMap[errMsg].code
            data = errorMap[errMsg].data
        }
        res.json({ code, data })
    }
    next()
}

