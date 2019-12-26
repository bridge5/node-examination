const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./swagger/db');
const PlayerRoutes = require('./swagger/api/player');
const Model = require('./swagger/db/models');

const app = express();

// use body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cors
app.use(cors());

// Router
app.get('/', (req, res) => {
    res.json({"message": "Building a RESTful CRUD API with Node.js, Express/Koa and MongoDB."});
});
app.use('/player', PlayerRoutes)

// error handler

// db models
global.db = new Model().getDb();

// connect db and start the serve
const port = process.env.PORT || 3000
db.connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}!!`);
    });
  })

module.exports = app