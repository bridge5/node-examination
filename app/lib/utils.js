'use strict';

const enums = require('../lib/enum');

/**
 * API返回参数统一
 */
function resJson(code, msg, data) {
    return {
        code,
        msg,
        data,
    };
}

/**
 * API统一错误处理
 */
function reqHandler(fun) {
    return async (req, res) => {
        try {
            await fun(req, res);
        } catch (err) {
            // 打印错误日志
            console.error(`[${new Date()}]-${req.originalUrl}: ${JSON.stringify(err.stack || err)}`);
            
            let code = enums.Code.FAIL;
            if (err.message){
                switch (err.message){
                case 'Validation exception': 
                case 'Invalid input': 
                    code = enums.Code.INVALID_INPUT; 
                    break;
                case 'Invalid ID supplied': 
                    code = enums.Code.INVALID_ID; 
                    break;
                case 'Player not found': 
                    code = enums.Code.NOT_FOUND; 
                    break;
                default: break;
                }
            }
            
            return res.json(resJson(code, err.message || err || '内部错误', {}));
        }
    };
}

module.exports = {
    resJson,
    reqHandler,
};