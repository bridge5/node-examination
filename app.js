const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const playerRouter = require('./routes/player');

const app = express();

const db = require(path.join(__dirname, './db/config/mongoose'))();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/player', playerRouter);

app.use(async function(req, res, next){
    // add some function to the response
    res.endWithErr = function(code, msg){
        this.status(code).send({msg: msg});
    };

    res.endWithData = function (data, msg='OK') {
        this.status(200).send({data, msg:msg});
    };

    res.makeError = function(code, message = ''){
        this.locals.err = {code: code, message: message};
    };

    return next();
});

app.use(function(req, res, next) {
    let code = 0, message = '', data = {};

    if(res.locals.err)
    {
        code = res.locals.err.code;
        message = res.locals.err.message;
    } else if(res.locals.data)
    {
        code = 200;
        data = res.locals.data;
        message = res.locals.message;
    }

    code = code || 404;

    return code === 200 ? res.endWithData(data, message) : res.endWithErr(code, message);
});



module.exports = app;
