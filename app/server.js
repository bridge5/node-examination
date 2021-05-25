// const express = require('express');

// const app = express();

// app.get('/', (req, res) => {
//     res.json({"message": "Building a RESTful CRUD API with Node.js, Express/Koa and MongoDB."});
// });

// app.listen(3000, () => {
//   console.log("Server is listening on port 3000");
// });

const Koa = require('koa');
const config = require('./config')
const middleware = require('./middleware');
const controller = require('./controller');

const app = new Koa();

middleware(app)

controller(app);

const server = app.listen(config.port, () => {
  console.log('Server now listen port: ', config.port)
})

module.exports = server