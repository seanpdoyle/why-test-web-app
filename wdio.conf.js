const app = require('./app');
const port = process.env.PORT || 3001;

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
