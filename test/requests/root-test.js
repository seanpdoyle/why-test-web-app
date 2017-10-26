const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const PORT = process.env.EXPRESS_PORT || 3000;

describe('/', () => {
  let server;

  beforeEach('Start server', (done) => {
    server = app.listen(PORT, done);
  });

  afterEach('Shutdown server', (done) => {
    server.close(done);
  });

  describe('POST', () => {
    it('updates the order', async () => {
      const name = 'Inquisitive User';

      const {text} = await request(server)
        .post('/')
        .send({name});

      assert.include(text, author);
      assert.include(text, message);
    });


  });
});

