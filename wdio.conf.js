const app = require('./app');
const port = process.env.EXPRESS_PORT || 3000;

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

  onPrepare() {
    expressServer = app.listen(port);
  },
  onComplete() {
    expressServer.close();
  },
};
