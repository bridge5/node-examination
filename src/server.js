import express from "express";
import bodyParser from "body-parser";
import playerRouter from "./routers/player_router";
import { connectDatabase } from "./dao/database/mongodb";

const app = express();
const port = process.env.NODE_ENV === "production" ? 80 : 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/player", playerRouter);

app.get("/", (req, res) => {
  res.json({
    message:
      "Building a RESTful CRUD API with Node.js, Express/Koa and MongoDB."
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

connectDatabase();
