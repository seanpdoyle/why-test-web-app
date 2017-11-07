const Message = require('../../models/message');
const {assert} = require('chai');
const database = require('../../database');

describe('Message', () => {
  beforeEach(async () => {
    const db = database.connection.db;
    if (db) {
      await db.dropDatabase();
    }
  });

  describe('#author', () => {
    it('is a String', () => {
      const authorAsAnInt = 1;

      const message = new Message({ author: authorAsAnInt });

      assert.strictEqual(message.author, authorAsAnInt.toString());
    });

    it('is required', () => {
      const message = new Message({ author: null })

      message.validateSync();

      const errors = message.errors;
      assert.equal(errors.author.message, 'Path `author` is required.');
    });
  });

  describe('#message', () => {
    it('is a String', () => {
      const messageAsAnInt = 1;

      const message = new Message({ message: messageAsAnInt });

      assert.strictEqual(message.message, messageAsAnInt.toString());
    });

    it('is required', () => {
      const message = new Message({ message: null })

      message.validateSync();

      const errors = message.errors;
      assert.equal(errors.message.message, 'Path `message` is required.');
    });
  });
});
