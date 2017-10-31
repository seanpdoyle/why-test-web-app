const app = require('./app');
const port = process.env.PORT || 3000;

let expressServer;

exports.config = {
  specs: [
    'test/features/*.js',
  ],
  coloredLogs: true,
  baseUrl: `http://localhost:${port}/`,
  framework: 'mocha',
  reporters: ['spec'],
  waitForTimeout: 10 * 1000,
  capabilities: [{
    browserName: 'chrome',
    chromeOptions: {
      args: ['--headless', '--no-sandbox'],
    },
  }],
  services: ['selenium-standalone'],

  onPrepare() {
    expressServer = app.listen(port);
  },
  onComplete() {
    expressServer.close();
  },
};
