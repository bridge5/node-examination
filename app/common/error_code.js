'use strict';

// 提示码格式”ABBccDEEE”，示例：”016012001”（0：不需要提示给客户用于问题定位，16：来自资产平台，01：来自标签中心，2：子系统自身提示，001：业务内部提示码）
/* eslint key-spacing: off */
module.exports = {
  SUCCESS_OK           : '0',
  ERROR_PARAMS         : 'ERROR_PARAMS',
  ERROR_UNKNOWN        : 'ERROR_UNKNOWN',
  NEED_LOGIN           : 'NEED_LOGIN',
};
