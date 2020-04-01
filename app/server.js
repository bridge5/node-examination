const express = require('express');
<<<<<<< HEAD

const app = express();
=======
const bodyParser = require('body-parser')
const app = express();
require('dotenv').config()
app.use(bodyParser.json())
>>>>>>> josh119891

app.get('/', (req, res) => {
    res.json({"message": "Building a RESTful CRUD API with Node.js, Express/Koa and MongoDB."});
});

<<<<<<< HEAD
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
=======
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/examination',{ useUnifiedTopology: true,useNewUrlParser: true });
mongoose.connection.on("error",function(error){
  console.log("ERROR"+error);
});
mongoose.connection.on("open",function(error){
  console.log("MONGO WORKING");
});

app.use('/player', require('./routes/player'));

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

module.exports= app
>>>>>>> josh119891
