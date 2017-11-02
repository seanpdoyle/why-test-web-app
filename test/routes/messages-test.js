const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const database = require('../../database');
const Message = require('../../models/message');

const PORT = process.env.EXPRESS_PORT || 3000;

const parseTextFromHTML = (htmlAsString, selector) => {
  return jsdom(htmlAsString).querySelector(selector).textContent;
};

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

      const response = await request(server).
        post('/messages').
        send({author, message});

      assert.equal(response.status, 200);
      assert.include(parseTextFromHTML(response.text, '#messages'), author);
      assert.include(parseTextFromHTML(response.text, '#messages'), message);
      assert.ok(await Message.findOne({message, author}), 'Creates a Message record');
    });

    describe('when the author is blank', () => {
      it('renders an error message', async () => {
        const message = 'Why Test?';

        const response = await request(server)
          .post('/messages')
          .send({message});

        assert.equal(response.status, 400);
        assert.include(parseTextFromHTML(response.text, '#message-form'), 'Invalid value');
        assert.equal((await Message.find({})).length, 0, 'did not save the Message');
      });
    });

    describe('when the message is blank', () => {
      it('displays an error message', async () => {
        const author = 'A User';

        const response = await request(server)
          .post('/messages')
          .send({author});

        assert.equal(response.status, 400);
        assert.include(parseTextFromHTML(response.text, '#message-form'), 'Invalid value');
        assert.equal((await Message.find({})).length, 0, 'did not save the Message');
      });
    });
  });
});
