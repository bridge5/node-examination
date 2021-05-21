process.on('uncaughtException', function uncaughtExceptionListener(err) {
  console.error('UNCAUGHT EXCEPTION ');
  console.error('[Inside \'uncaughtException\' event] ' + err.stack || err.message);
  //quit and disconnect
  process.exit(1);
});

const config  = require('./config');
let logger    = require('./app/libs/logger');
let koaServer = require('./app/server');
let db        = require('./app/libs/mongoose');
let server    = require('http').createServer(koaServer.callback());

db.once('connected', () => {
  logger.info('app startup');
  server.listen(config.httpPort || 3000, config.httpHost);
});

server.on('listening', () => {
  logger.info('Server listening on http://%s:%d', config.httpHost, server.address().port);
  process.send && process.send('ready'); //pm2 cluster
});

process.on('SIGINT', () => {
  logger.warn('Closing server...');
  server.close(() => {
    logger.warn('http closed.');
    db.close(() => {
      logger.warn('db closed.');
      process.exit(0);
    });
  });
});
