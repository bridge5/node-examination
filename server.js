const express = require('express');
const app = express();
const db = require('./swagger/db')
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 

const playerRoutes = require('./swagger/api/Players');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/*** DB connection ***/

db.connect()
  .then(() => {
    const port = process.env.PORT || 3000;
    if (process.env.NODE_ENV !== 'test') {
      app.listen(port, () => {
        console.info("Server is listening on port 3000");
      });
    }
  })

/*** End of DB connection ***/

/*** CORS ***/

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  )
  next();
})

/*** End of CORS ***/

/*** log format ***/

morgan.format('DEV', '[DEV] :method :url :status');
app.use(morgan('DEV'));

/*** End of log format ***/

/*** Router **/

app.use('/players', playerRoutes);

/** End of Router ***/

app.use((req, res, next) => {
  const error = new Error('Not found');
  res.status(404);
  next(error);
})

app.use((error, req, res, next) => {
  res.status(res.statusCode || 500);
  res.json({
    message: error.message
  })
})

app.get('/', (req, res) => {
    res.status(200).json({
      "message": "Building a RESTful CRUD API with Node.js, Express/Koa and MongoDB."
    });
});



module.exports = app;