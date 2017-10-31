const Order = require('../../models/order');
const {assert} = require('chai');

describe('Order', () => {
  describe('name', () => {
    it('is a String', () => {
      const nameAsAnInt = 1;

      const order = new Order({ name: nameAsAnInt });

      assert.strictEqual(order.name, nameAsAnInt.toString());
    });
  });
});
