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
  });
});
