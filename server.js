const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const validate = require('koa-validate');
const bunyan = require('bunyan');
const bformat = require('bunyan-format');
const cors = require('@koa/cors');
const http = require('http');
const mongoDBModels = require('./models/mongo');
const db = require('./utils/db');
const app = new Koa();
const config = require('./config/config.development');
const responseMiddleware = require('./utils/middleware');

const main = async () => {
  try {
    app.projConfig = {
      ...config,
    };

    const formatOut = bformat({ outputMode: 'long' });
    app.logger = bunyan.createLogger({
      name: 'NBA_api', 
      src: true,
      // streams: [{ stream: new BunyanLogStream() }],
      streams: [{
        level: 'debug',
        stream: formatOut,
      }, {
        level: 'error',
        path: `${config.log_path}/error_log.json`,
        src: true,
      }],
    });

    // Mongo DB
    await db.mongo(config.mongo);
    app.mongoDBModels = mongoDBModels;
    app.logger.info('[OK] Mongo DB');

    // Makeup App
    app.use(bodyParser());
    validate(app);

    // 挂载封装好的返回逻辑
    app.use(responseMiddleware);
    
    let port;
    app.use(cors());
    const router = require('./swagger/api/router');
    app.use(router.routes())
      .use(router.allowedMethods());
    app.logger.info('[OK] Apis');
    port = config.port;

    port = port || config.port;
    http.createServer(app.callback()).listen(port, config.ip);

    app.on('error', (err, ctx) => {
      app.logger.error(err.stack);
    });
    app.proxy = true;
    app.logger.info(`[OK] Start -> ${config.ip}:${port}`);
  } catch (err) {
    console.error(err.stack);
  }
};

main();

// app.get('/', (req, res) => {
//     res.json({"message": "Building a RESTful CRUD API with Node.js, Express/Koa and MongoDB."});
// });

// app.listen(3000, () => {
//   console.log("Server is listening on port 3000");
// });