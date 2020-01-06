const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({
    message:
      "Building a RESTful CRUD API with Node.js, Express/Koa and MongoDB."
  });
});

require("./routes")(app);

app.get("/player", (req, res) => createPlayer.main(req));

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
