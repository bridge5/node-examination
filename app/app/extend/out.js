'use strict';

class Out {
  success(data, page) {
    return {
      errcode: 0,
      errmsg: 'ok',
      data,
      page,
    };
  }
  error(errcode, errmsg) {
    if (errmsg.indexOf('connect ') > -1 || errmsg.indexOf('Connect ') > -1 || errmsg.indexOf('denied ') > -1) {
      errmsg = '网络异常，请稍后重试';
    }
    return {
      errcode: errcode === undefined ? 500 : Number(errcode),
      errmsg,
    };
  }
}
module.exports = Out;
