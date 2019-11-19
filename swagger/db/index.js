const mongoose = require('mongoose');
const DB_URI = "your DB URI";

const DB_CONFIG = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

const connect = () => {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'test') {
      const Mockgoose = require('mockgoose');
      const mockgoose = new Mockgoose(mongoose);
      mockgoose.prepareStorage()
        .then(() => {
          mongoose.connect(DB_URI, DB_CONFIG)
          .then((res, err) => {
            if (err) return reject(err);
            resolve();
          })
        });
    } else {
      mongoose.connect(DB_URI, DB_CONFIG)
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


