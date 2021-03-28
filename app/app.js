const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routerV1=require('./router/router.v1.js')
app.use('/api/v1',routerV1)
app.get('/', (req, res) => {
    res.json({"message": "Building a RESTful CRUD API with Node.js, Express/Koa and MongoDB."});
});

// app.listen(8000, () => {
//     console.log("Server is listening on port 3000");
// });

module.exports=app
