module.exports = {
  mysql: {
    user: 'root',
    password: '123456',
    database: 'example',
    orm: {
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      query: {
        raw: true,
      },
      pool: {
        max: 10000,
        min: 0,
        idle: 10000,
        handleDisconnects: true,
      },
      dialectOptions: {
        connectTimeout: 10000,
        dateStrings: true,
        typeCast: true,
      },
      timezone: '+08:00',
      logging: true,
    },
  },
};
