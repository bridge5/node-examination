/**
 * response 格式化中间件
 */

'use strict';

const log = require('../common/log');
const config = require('../config');
const SysError = require('../common/sys_error');
const C = require('../common/constant');

module.exports = function() {
  return async (ctx, next) => {
    try {
      await next();

      ctx.body = {
        code: 0,
        success: true,
        content: ctx.body,
        message: null,
      };
    } catch (err) {
      ctx.status = err.status || 200;
      // 暂时用console.log
      log.warn('server warn:', ctx.request.method, ctx.request.originalUrl, ctx.path, ctx.status);

      if (config.debug || !err.code) {
        log.error('server warn err', err);
      } else {
        log.warn('server warn err', err);
      }

      if (err instanceof SysError) {
        ctx.body = {
          code: err.code || 0,
          success: false,
          content: err.content || null,
          message: err.message,
        };
      } else {
        ctx.body = {
          code: 0,
          success: false,
          content: null,
          message: C.M.SERVER_ERROR,
        };
      }
    }
  };
};
