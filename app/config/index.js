/**
 * File: index.js
 * Project: node-examination
 * FilePath: /config/index.js
 * Created Date: 2021-05-24 15:44:31
 * Author: SaltFish l1218838196@gmail.com
 * -----
 * Last Modified: 2021-05-24 19:00:55
 * Modified By: SaltFish
 * -----
 * Description:
 */

module.exports = {
  mongoDb: {
    url: 'mongodb://119.3.174.61:27017/?authSource=admin',
    option: {
      dbName: 'test',
      user: 'user',
      pass: 'pass@word',
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  prefix: '/v1',
  port: 80
}