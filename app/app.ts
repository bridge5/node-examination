

import express from 'express';
import bodyParser from 'body-parser';
import initRouters from './router';
import initORM from './model';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
initORM();
initRouters(app);


app.listen(process.env.SERVER_PORT, () => {
  console.log("Server is listening on port 3000");
});

export { app };
