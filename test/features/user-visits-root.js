const assert = require('assert');

describe('User visits root', () => {
  it('displays a welcome message', () => {
    browser.url('/');

    assert.equal(browser.getText('[data-role="welcome"]'), 'Welcome to Express');
  });
});
