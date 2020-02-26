const mongoose = require('mongoose');
const qs = require('qs');

/**
 * 初始化MongoDB数据库
 * @author Junyi <junyili@newcreds.com>
 * @param {object} config - Configs for DB Instance
 * @param {promise}
 */

const initMongoDB = async (config) => {
  mongoose.Promise = global.Promise;
  const mongoBaseUri = config.rep ? `${config.rep_url}/${config.db}` : `${config.url}:${config.port}/${config.db}`;
  const mongoQs = {
    authMechanism: 'SCRAM-SHA-1',
  };
  if (config.rep_set) {
    mongoQs.replicaSet = config.rep_set;
  }
  const mongoUri = config.auth
    ? `mongodb://${config.username}:${config.password}@${mongoBaseUri}?${qs.stringify(mongoQs)}`
    : `mongodb://${mongoBaseUri}`;
  // console.log(`mongo connection url ${mongoUri}`)
  await mongoose.connect(mongoUri, { useNewUrlParser: true });
  return Promise.resolve(mongoose);
};


module.exports = {
  mongo: initMongoDB,
}
