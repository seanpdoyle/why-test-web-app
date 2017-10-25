const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');
const database = require('../../database');
const Message = require('../../models/message');

const PORT = process.env.PORT || 3001;

describe('/messages', () => {
  let server;

  beforeEach('Start server', (done) => {
    server = app.listen(PORT, done);
  });

  afterEach('Drop database', (done) => {
    database.connection.db.dropDatabase(done);
  });

  afterEach('Shutdown server', (done) => {
    server.close(done);
  });

  describe('POST', () => {
    it('creates a new message', async () => {
      const author = 'Inquisitive User';
      const message = 'Why Test?';

      const {text} = await request(server)
        .post('/messages')
        .send({author, message});

      assert.include(text, author);
      assert.include(text, message);
    });

    describe('when the author is blank', () => {
      it('renders an error message', async () => {
        const message = 'Why Test?';

        const {text} = await request(server)
          .post('/messages')
          .send({message});

        const messages = await Message.find({});
        assert.include(text, 'Invalid value');
        assert.empty(messages);
      });
    });

    describe('when the message is blank', () => {
      it('displays an error message', async () => {
        const author = 'A User';

        const {text} = await request(server)
          .post('/messages')
          .send({author});

        const messages = await Message.find({});
        assert.include(text, 'Invalid value');
        assert.empty(messages);
      });
    });
  });
});
