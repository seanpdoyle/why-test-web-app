const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const {mongoose, databaseUrl, options} = require('../../database');
const Message = require('../../models/message');

const PORT = process.env.EXPRESS_PORT || 3000;

const parseTextFromHTML = (htmlAsString, selector) => {
  return jsdom(htmlAsString).querySelector(selector).textContent;
};

describe('/messages', () => {
  let server;

  beforeEach('Start server', async () => {
    await mongoose.connect(databaseUrl, options);
    await mongoose.connection.db.dropDatabase();
    server = await app.listen(PORT);
  });

  afterEach('Shutdown server', async () => {
    await server.close();
  });

  describe('POST', () => {
    describe('when the Message is valid', () => {
      it('creates a new message', async () => {
        const author = 'Inquisitive User';
        const message = 'Why Test?';

        const response = await request(server).
          post('/messages').
          send({author, message});

        assert.ok(await Message.findOne({message, author}), 'Creates a Message record');
      });

      it('redirects to the index', async () => {
        const author = 'Inquisitive User';
        const message = 'Why Test?';

        const response = await request(server).
          post('/messages').
          send({author, message});

        assert.equal(response.status, 302);
        assert.equal(response.headers.location, '/');
      });
    });

    describe('when the author is blank', () => {
      it('renders an error message', async () => {
        const message = 'Why Test?';

        const response = await request(server)
          .post('/messages')
          .send({message});

        assert.equal(response.status, 400);
        assert.include(parseTextFromHTML(response.text, '#message-form'), 'required');
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
        assert.include(parseTextFromHTML(response.text, '#message-form'), 'required');
        assert.equal((await Message.find({})).length, 0, 'did not save the Message');
      });
    });
  });
});
