const express = require('express');
const bodyParser = require('body-parser');
const xmlBodyParser = require('body-parser-xml')(bodyParser);
const db = require('./lib/database');
const router = require('./routes');
const util = require('./utils');

const app = express();

app.use(bodyParser.urlencoded({ extended: false, limit: '20mb' }));
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.xml());

app.get('/', (req, res) => {
    res.json({"message": "Building a RESTful CRUD API with Node.js, Express/Koa and MongoDB."});
});

app.use('/player', router.PlayerRouter);

const appStart = async () => {
  await db.connect();
  app.listen(3000, () => {
    util.log("RESTful Server is listening on port 3000");
  });
}

appStart();