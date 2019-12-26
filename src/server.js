import express from "express";
import bodyParser from "body-parser";
import playerRouter from "./routers/player_router";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/player", playerRouter);

app.get("/", (req, res) => {
  res.json({
    message:
      "Building a RESTful CRUD API with Node.js, Express/Koa and MongoDB."
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
