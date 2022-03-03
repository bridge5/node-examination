import * as express from 'express';
import router from "./router/router"
import { mysqlConnect } from "./common/database/mysql"
import * as bodyParser from "body-parser"

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Router
app.use("/api", router);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});