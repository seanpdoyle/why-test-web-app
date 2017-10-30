const {assert} = require('chai');
const request = require('supertest');
const Order = require('../../models/order');

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
    it('updates the name on the order', async () => {
      const name = 'Inquisitive User';

      const response = await request(server)
        .post('/')
        .send({name})

      assert.equal(response.status, 200);
      assert.include(response.text, name);
      const order = await Order.findOne();
      assert.equal(order.name, name);
    });
  });
});

