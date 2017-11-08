const app = require('./app');
const port = process.env.PORT || 3000;
const {mongoose, databaseUrl, options} = require('./database');

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

  async beforeTest() {
    await mongoose.connect(databaseUrl, options);
    await mongoose.connection.db.dropDatabase();
    expressServer = app.listen(port);
  },

  async afterTest() {
    await mongoose.disconnect();
    expressServer.close();
  },
};
