const app = require('./app');
const port = process.env.EXPRESS_PORT || 3000;
const database = require("./database");

let expressServer;

exports.config = {
  specs: [
    'test/features/*.js',
  ],
  coloredLogs: true,
  baseUrl: `http://localhost:${port}/public`,
  framework: 'mocha',
  reporters: ['dot'],
  capabilities: [{
    browserName: 'chrome',
  }],
  chromeOptions: {
    args: ['--headless'],
  },
  services: ['selenium-standalone'],

  async onPrepare() {
    expressServer = app.listen(port);
  },
  async onComplete() {
    expressServer.close();
    await database.connection.db.dropDatabase();
    await database.disconnect();
  },
};
