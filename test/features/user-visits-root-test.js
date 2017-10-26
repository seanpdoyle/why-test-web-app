const {assert} = require('chai');

const messagesText = async () => browser.getText('[data-role=messages]');

describe('User visits root', () => {
  describe('posting a message', () => {
    it('saves the message with the author information', async () => {
      const author = 'Inquisitive User';
      const message = 'Why test?';

      browser.url('/');
      browser.setValue('input[name=author]', author);
      browser.setValue('input[name=message]', message);
      browser.click('input[type=submit]');
      
      assert.include(await browser.getText('[data-role=messages]'), message);
      assert.include(messagesText(), author);
    });
  });
});
