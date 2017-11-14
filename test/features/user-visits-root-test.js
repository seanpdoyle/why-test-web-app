const {assert} = require('chai');

describe('User visits root', () => {
  describe('to post an order', () => {
    it('starts with a blank order', () => {
      browser.url('/');

      assert.equal(browser.getText('#deliver-to'), '');
      assert.equal(browser.getText('#cake-type'), '');
      assert.equal(browser.getText('#fillings'), '');
      assert.equal(browser.getText('#size'), '');
      assert.equal(browser.getText('#pickUp'), '');
    });

    it('accepts the customer name', () => {
      const name = 'Hungry Person';

      browser.url('/');
      browser.setValue('#name', name);
      browser.click('#submit-order');
      browser.url('/');

      assert.include(browser.getText('#deliver-to'), name);
    });

    it('accepts the cake type', () => {
      const cakeType = 'Whole wheat';

      browser.url('/');
      browser.click('#whole-wheat');
      browser.click('#submit-order');
      browser.url('/');

      assert.include(browser.getText('#cake-type'), cakeType);
    });

    it('accepts multiple fillings', () => {
      const firstChoice = 'Strawberries';
      const secondChoice = 'Banana';

      browser.url('/');
      browser.click('#strawberries');
      browser.click('#banana');
      browser.click('#submit-order');
      browser.url('/');

      assert.include(browser.getText('#fillings'), firstChoice);
      assert.include(browser.getText('#fillings'), secondChoice);
    });

    it('accepts the stack size', () => {
      const optionText = 'Double Stack';
      const optionNum = '2';

      browser.url('/');
      browser.selectByVisibleText('#select-stack', optionText)
      browser.click('#submit-order');
      browser.url('/');

      assert.include(browser.getText('#size'), optionNum);
    });

    it('accepts the pickUp time', () => {
      const time = '8:00';

      browser.url('/');
      browser.selectByVisibleText('#select-pickUp', time)
      browser.click('#submit-order');
      browser.url('/');

      assert.include(browser.getText('#pickUp'), time);
    });
  });

  describe('to clear an order', () => {
    it('deletes the selected options', () => {
      const name = 'Indecisive Person';
      const time = '10:00';

      browser.url('/');
      browser.setValue('#name', name);
      browser.selectByVisibleText('#select-pickUp', time)
      browser.click('#submit-order');
      browser.click('#clear-order');
      browser.url('/');

      assert.equal(browser.getText('#deliver-to'), '');
      assert.equal(browser.getText('#cake-type'), '');
      assert.equal(browser.getText('#fillings'), '');
      assert.equal(browser.getText('#size'), '');
      assert.equal(browser.getText('#pickUp'), '');
    });
  });
});
