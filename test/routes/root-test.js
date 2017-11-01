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
        const order = await Order.create({ name: 'Hungry User' })

        const response = await request(server).get('/');

        assert.equal(response.status, 200);
        assert.include(response.text, 'Hungry User');
      });

      it('renders the Order', async () => {
        const order = await Order.create({ name: 'Hungrier User' })

        const response = await request(server).get('/');

        assert.equal(response.status, 200);
        assert.include(response.text, 'Hungrier User');
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
      const name1 = 'Inquisitive User';
      const name2 = 'Anxious User';

      await request(server)
        .post('/')
        .send({name: name1});

      const response = await request(server)
        .post('/')
        .send({name: name2});
      
      assert.equal(response.status, 200);
      assert.include(response.text, name2);
      assert.notInclude(response.text, name1);
      const order = await Order.findOne();
      assert.equal(order.name, name2);
    });
  });
});

