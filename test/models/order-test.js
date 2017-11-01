const Order = require('../../models/order');
const {assert} = require('chai');
const database = require('../../database');

describe('Order', () => {
  beforeEach(async () => {
    await database.connection.db.dropDatabase();
  });

  describe('.updateOrCreate', () => {
    describe('when a record already exists', () =>{
    });

    describe('when a record does not exist', () =>{
      it('creates the record', async () => {
        const name = 'Hungry Person'

        const order = await Order.updateOrCreate({name});

        const allOrders = await Order.find({});
        assert.equal(allOrders.length, 1);
        assert.equal(allOrders[0].name, name);
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
