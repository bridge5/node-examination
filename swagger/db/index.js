const mongoose = require('mongoose');
const config = require('../../config/config')

const connect = () => {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'test') {
      const Mockgoose = require('mockgoose');
      const mockgoose = new Mockgoose(mongoose);
      mockgoose.prepareStorage()
        .then(() => {
          mongoose.connect(config.MOCK_DB_URIDB_URI, config.MOCK_DB_CONFIG)
          .then((res, err) => {
            if (err) return reject(err);
            resolve();
          })
        });
    } else {
      mongoose.connect(config.DB_URI, config.DB_CONFIG)
      .then((res, err) => {
        if (err) return reject(err);
        resolve();
      })
    }
  })
}

const close = () => {
  return mongoose.disconnect();
}

module.exports = { connect, close };


