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
    it('sets the name on the order', async () => {
      const name = 'Inquisitive User';

      const response = await request(server)
        .post('/')
        .send({name})

      assert.equal(response.status, 200);
      assert.include(response.text, name);
      const order = await Order.findOne();
      assert.equal(order.name, name);
    });

    it('updates the name on the order', async () => {
      const name1 = 'Inquisitive User';
      const name2 = 'Anxious User';

      await request(server)
        .post('/')
        .send({name1});

      const response = await request(server)
        .post('/')
        .send({name2});
      
      assert.equal(response.status, 200);
      assert.include(response.text, name2);
      assert.notInclude(response.text, name1);
      const order = await Order.findOne();
      assert.equal(order.name, name2);
    });
  });
});

