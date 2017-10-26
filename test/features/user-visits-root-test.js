const {assert} = require('chai');

const getMessagesText = () => browser.getText('#messages-container');

describe('User visits root', () => {
  describe('without existing messages', () => {
    it('starts blank', () => {
      browser.url('/');

      assert.empty(getMessagesText());
    });
  });

  describe('posting a message', () => {
    it('saves the message with the author information', () => {
      const author = 'Inquisitive User';
      const message = 'Why test?';

      browser.url('/');
      browser.setValue('#author-input', author);
      browser.setValue('#message-input', message);
      browser.click('#submit-button');
      browser.waitForExist('.message');

      const messages = getMessagesText();
      assert.include(messages, message);
      assert.include(messages, author);
    });
  });
});
