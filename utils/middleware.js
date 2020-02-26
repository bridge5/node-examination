const responseMiddleware = async (ctx, next) => {
  ctx.JSONRes = (resData) => {
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data: resData,
      success: true,
      errmsg: null,
    };
    ctx.set({
      'Content-Type': 'application/json',
    });
  };

  ctx.JSONError = (errMsg, statusCode) => {
    let errmsg = '';
    if (errMsg instanceof Array) {
      errMsg.map((errObj) => {
        errmsg += Object.values(errObj).join(',');
      });
    } else if (typeof errMsg === 'string') {
      errmsg += errMsg;
    }
    ctx.status = statusCode || 400;
    ctx.body = {
      code: statusCode,
      data: null,
      success: false,
      errmsg: errmsg,
    };
    ctx.set({
      'Content-Type': 'application/json',
    });
  };

  await next();
};

module.exports = responseMiddleware;
