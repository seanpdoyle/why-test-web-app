const {assert} = require('chai');

describe('User visits root', () => {
  describe('to post an order', () => {
    describe('with a customer name', () => {
      it('pre-populates the customer name when an order already exists', () => {
        const order = {
          name: 'Hungry Customer'
        };
        browser.url('/');
        browser.setValue('#name', order.name);
        browser.click('#submit-name');
        //browser.setCookie({ name: 'order', value: JSON.stringify(order) });

        browser.url('/');

        assert.include(browser.getText('#deliver-to'), order.name);
      });

      it('can edit the customer name', () => {
        const name = 'Hungry Person';

        browser.url('/');
        browser.setValue('#name', name);
        browser.click('#submit-name');

        assert.include(browser.getText('#deliver-to'), name);
      });
    });

    it('accepts the cake type', () => {
      const cakeType = 'Whole wheat';

      browser.url('/');
      browser.click('#whole-wheat');
      browser.click('#submit-cake-type');

      assert.include(browser.getText('#cake'), cakeType);
    });
  });
});
