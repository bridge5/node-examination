const express = require('express');
const path = require('path');
const debug = require('debug')('app:server');
const mongoose = require('mongoose');
require('dotenv').config();

const indexRouter = require('./routes/index');

const app = express();

app.use(express.json());

// connect MongoDB
const url = process.env.MONGODB_URL || 'mongodb://127.0.0.1/test';

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(console.error.bind(console, 'connection error:'));

mongoose.connection.once('open', () => {
  debug("MongoDB connected!");
});

app.use('/', indexRouter);

// catch mongoose ValidationError
app.use(function(err, req, res, next) {
  if (err instanceof mongoose.Error.ValidationError) {
    let errors = [];

    createError(err.errors['name']);
    createError(err.errors['position']);
    createError(err.errors['id']);

    res.status(400).json({ errors });

    // create error
    function createError(err) {
      if (err) {
        errors.push({
          kind: err.kind,
          message: err.message,
          path: err.path
        });
      }
    }

  } else {
    next(err);
  }
});

module.exports = app;
