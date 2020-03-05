const express = require('express');
const bodyParser = require('body-parser');
const route = require('./router')
const errorHandle = require('./middleware/errorHandle')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

route(app);

app.use(errorHandle);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

module.exports = app
