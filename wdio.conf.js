const app = require('./app');
const port = process.env.PORT || 3000;
const database = require("./database");

let expressServer;

exports.config = {
  specs: [
    'test/features/*.js',
  ],
  coloredLogs: true,
  baseUrl: `http://localhost:${port}/`,
  framework: 'mocha',
  reporters: ['spec'],
  waitforTimeout: 10 * 1000,
  capabilities: [{
    browserName: 'chrome',
    chromeOptions: {
      args: [
        '--headless',
        '--no-sandbox',
      ],
    },
  }],
  services: ['selenium-standalone'],

  async onPrepare() {
    expressServer = app.listen(port);
  },
  async onComplete() {
    await expressServer.close();
    await database.connection.db.dropDatabase();
    await database.disconnect();
  },
};
