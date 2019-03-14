const express = require('express');

const app = express();
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const xmlBodyParser = require('express-xml-bodyparser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(xmlBodyParser())

app.get('/', (req, res) => {
    res.json({"message": "Building a RESTful CRUD API with Node.js, Express/Koa and MongoDB."});
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

routes(app)

module.exports = app;