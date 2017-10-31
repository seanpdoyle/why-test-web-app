const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');
const database = require('../../database');
const Message = require('../../models/message');

const PORT = process.env.EXPRESS_PORT || 3000;

const serializeObject = (obj) => JSON.parse(JSON.stringify(obj));

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

  describe('GET', () => {
    it('returns an array of all created messages', async () => {
      const author = 'Inquisitive User';
      const message = 'Why Test?';

      await Message.create({author, message});
      let allMessages = await Message.find({}).lean().then(serializeObject);
      const response = await request(app)
        .get('/messages');
      assert.deepEqual(response.body, allMessages);
    });
  });

  describe('POST', () => {
    it('creates a new message', async () => {
      const author = 'Inquisitive User';
      const message = 'Why Test?';

      const {text} = await request(server)
        .post('/messages')
        .send({author, message})
        .expect(201);

      assert.include(text, author);
      assert.include(text, message);
    });

    describe('when the author is blank', () => {
      it('returns an error message', async () => {
        const message = 'Why Test?';

        const response = await request(server)
          .post('/messages')
          .send({message});

        const messages = await Message.find({});
        assert.equal(response.status, 400);
        assert.isEmpty(messages);
      });
    });

    describe('when the message is blank', () => {
      it('displays an error message', async () => {
        const author = 'A User';

        const response = await request(server)
          .post('/messages')
          .send({author});

        const messages = await Message.find({});
        assert.equal(response.status, 400);
        assert.isEmpty(messages);
      });
    });
  });
});
