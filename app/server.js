const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {SERVERPORT}=require('config-lite')(__dirname);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routerV1=require('./router/router.v1.js')
app.use('/api/v1',routerV1)
app.get('/', (req, res) => {
    res.json({"message": "Building a RESTful CRUD API with Node.js, Express/Koa and MongoDB."});
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(SERVERPORT, () => {
  console.log(`Server is listening on port ${SERVERPORT}`);
});

