const Order = require('../../models/order');
const {assert} = require('chai');
const database = require('../../database');

describe('Order', () => {
  beforeEach(async () => {
    const db = database.connection.db;
    if (db) {
      await db.dropDatabase();
    }
  });

  describe('.updateOrCreate', () => {
    describe('when a record already exists', () =>{
      it('updates the record', async () => { 
        const existingOrder = await Order.create({ name: 'Hungry Person' })

        const order = await Order.updateOrCreate({name: 'Hungrier Person' });

        const allOrders = await Order.find({});
        assert.equal(allOrders.length, 1);
        assert.equal(allOrders[0].name, 'Hungrier Person');
        assert.equal(order.name, 'Hungrier Person');
      });
    });

    describe('when a record does not exist', () =>{
      it('creates the record', async () => {
        const name = 'Hungry Person'

        const order = await Order.updateOrCreate({name});

        const allOrders = await Order.find({});
        assert.equal(allOrders.length, 1);
        assert.equal(allOrders[0].name, name);
        assert.equal(order.name, name);
      });
    });
  });

  describe('#name', () => {
    it('is a String', () => {
      const nameAsAnInt = 1;

      const order = new Order({ name: nameAsAnInt });

      assert.strictEqual(order.name, nameAsAnInt.toString());
    });
  });
});
