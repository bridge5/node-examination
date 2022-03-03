const { Controller } = require('egg');
const fs = require('fs');
const path = require('path');
const pump = require('mz-modules/pump');
const UUID = require('uuid');

class BaseController extends Controller {
  success(data, page) {
    this.ctx.body = {
      errcode: 200,
      errmsg: 'ok',
      data,
      page,
    };
  }

  error(errcode, errmsg) {
    this.ctx.body = {
      errcode: errcode === undefined ? 500 : errcode,
      errmsg,
    };
  }

  async upload(flage) {
    const { service, ctx } = this;
    const parts = ctx.multipart({ autoFields: true });
    const files = [];

    let stream;
    while ((stream = await parts()) != null) {
      let filename = stream.filename.toLowerCase();
      const baseFilenamePath = filename.split('.');
      const subfix = baseFilenamePath[baseFilenamePath.length - 1];
      filename = UUID.v4() + '.' + subfix;
      const target = path.join(this.config.baseDir, 'app/public', filename);
      const writeStream = fs.createWriteStream(target);
      await pump(stream, writeStream);
      files.push({ filed: filename, filepath: target });
    }
    if (flage == true) {
      return files;
    }
    this.success(files);
    ctx.status = 200;

  }

}
module.exports = BaseController;
