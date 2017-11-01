const {assert} = require('chai');
const request = require('supertest');
const Order = require('../../models/order');

const app = require('../../app');
const database = require('../../database');

const PORT = process.env.EXPRESS_PORT || 3000;

describe('/', () => {
  let server;

  beforeEach('Start server', (done) => {
    server = app.listen(PORT, done);
  });

  afterEach('Shutdown server', async () => {
    await server.close();
    await database.connection.db.dropDatabase();
  });

  describe('GET', () => {
    describe('when the Order is new', () => {
      it('renders a blank Order', async () => {
        const response = await request(server).get('/');

        assert.equal(response.status, 200);
      });
    });

    describe('when the Order already exists', () => {
      it('renders the Order', async () => {
        const name = 'Hungry User'
        const order = await Order.create({name})

        const response = await request(server).get('/');

        assert.equal(response.status, 200);
        assert.include(response.text, name);
      });
    });
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
      const initialName = 'Inquisitive User';
      const updatedName = 'Anxious User';

      await request(server)
        .post('/')
        .send({name: initialName});

      const response = await request(server)
        .post('/')
        .send({name: updatedName});
      
      assert.equal(response.status, 200);
      assert.include(response.text, updatedName);
      assert.notInclude(response.text, initialName);
      const order = await Order.findOne();
      assert.equal(order.name, updatedName);
    });
  });
});

