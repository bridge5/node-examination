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
            // TODO 打印错误日志
            console.error(`[${req.logId}]-${req.url}: ${JSON.stringify(err)}`);
            return res.json(resJson(enums.Code.FAIL, err.message || err || '内部错误', {}));
        }
    };
}

module.exports = {
    resJson,
    reqHandler,
};