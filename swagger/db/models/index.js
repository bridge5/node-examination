const fs = require('fs')
const path = require('path')

module.exports = class Models {
  constructor() {
    let db = {}

    fs
      .readdirSync(__dirname)
      .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
      })
      .forEach(file => {
        const model = require(path.join(__dirname, file))
        // modelName
        db[model.modelName] = model
      })

    this.db = db
  }

  getDb() {
    return this.db
  }
}