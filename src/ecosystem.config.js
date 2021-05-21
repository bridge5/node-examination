// https://pm2.keymetrics.io/docs/usage/application-declaration/

module.exports = {
  apps: [
    {
      name: "node-examination",
      script: "./index.js",
      watch: false,
      //instances: 1,
      exec_mode: 'cluster',
      shutdown_with_message: false,
      wait_ready: true,
      env: {
        "PORT": 3000,
        "NODE_ENV": "development"
      },
      env_production: {
        "PORT": 8000,
        "NODE_ENV": "production",
      }
    },
  ]
};