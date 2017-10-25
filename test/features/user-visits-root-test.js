const {assert} = require('chai');

describe('User visits root', () => {
  describe('to post an order', () => {
    it('accepts the customer name', () => {
      const name = 'Hungry Person';

      browser.url('/');
      browser.setValue('#name', name);
      browser.click('#submit-name');

      assert.include(browser.getText('#deliver-to'), name);
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
