const mongoose = require('mongoose')
const mongoUri = require('../../config').mongoUri
const mongoTestUri = require('../../config').mongoTestUri

async function connect() {
  return new Promise((resolve, reject) => {
    const URI = process.env.NODE_ENV === 'test'? mongoTestUri: mongoUri
    mongoose.connect(URI, { useNewUrlParser: true, useCreateIndex: true })
      .then((res, err) => {
        if(err) return reject(err)
        resolve()
      })
  })
}

function close() {
  return mongoose.disconnect()
}

module.exports = {
  connect,
  close
}