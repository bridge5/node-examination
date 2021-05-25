/**
 * File: player.js
 * Project: node-examination
 * FilePath: /resources/player.js
 * Created Date: 2021-05-24 16:21:29
 * Author: SaltFish l1218838196@gmail.com
 * -----
 * Last Modified: 2021-05-24 23:28:44
 * Modified By: SaltFish
 * -----
 * Description:
 */
const autoIncrement = require('mongoose-auto-increment');
const { Schema } = require('mongoose')

const postionEnum = [
  'C', 'PF', 'SF', 'PG', 'SG'
]

module.exports = {
  name: "Player",
  schema: new Schema({
    // id: {
    //   required: true,
    //   type: Schema.Types.Number
    // },
    name: {
      required: true,
      type: Schema.Types.String
    },
    position: {
      type: Schema.Types.String
    },
  }),
  validator: {
    id: (val) => {
      if (typeof val !== 'number' || !Number.isInteger(val)) {
        throw new TypeError('id must be integer')
      }
    },
    name: (val) => {
      if (typeof val !== 'string') {
        throw new TypeError('name must be string')
      }
    },
    position: (val) => {
      if (typeof val !== 'string') {
        throw new TypeError('position must be string')
      }
      if (postionEnum.indexOf(val) === -1) {
        throw new TypeError(`position must valueof [${postionEnum.join(',')}]`)
      }
    },
  }
}