//simplied config
let env = (process.env.NODE_ENV || 'dev').toLocaleLowerCase();
console.warn(`app running at ${env}.`);

module.exports = {
  env,
  isProd: env === 'product',
  httpPort: 3000,
  httpHost: '0.0.0.0',
  mongoose: {
    uri: "mongodb://127.0.0.1:27017/node-examination",
    options: {
      //user: '',
      //pass: '',
      authSource: 'admin',
      noDelay: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },
  //for mongodb replica sets, should set read isolation and write concern options
  mongoWriteConcern: {w: 'majority', j: true},
};
