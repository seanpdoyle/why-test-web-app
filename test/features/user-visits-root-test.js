const {assert} = require('chai');

const messagesText = () => browser.getText('#messages');

describe('User visits root', () => {
  // Let's write this test first
  describe('without existing messages', () => {
    it('starts blank', () => {
      browser.url('/');

      // Let's inline this first, then extract
      // to a helper when we write the second tes
      assert.empty(browser.getText('#messages'));
    });
  });

  // Let's follow up with this test
  describe('posting a message', () => {
    it('saves the message with the author information', () => {
      const author = 'Inquisitive User';
      const message = 'Why test?';

      browser.url('/');
      browser.setValue('input[name=author]', author);
      browser.setValue('input[name=message]', message);
      browser.click('input[type=submit]');

      assert.include(messagesText(), message);
      assert.include(messagesText(), author);
    });
  });
});
