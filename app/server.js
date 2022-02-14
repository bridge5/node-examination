const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const playerRouter=require('./router/v1/playerRouter.js')
app.use('/api/v1/player',playerRouter)
app.get('/', (req, res) => {
    res.json({"message": "Building a RESTful CRUD API with Node.js, Express/Koa and MongoDB."});
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
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


