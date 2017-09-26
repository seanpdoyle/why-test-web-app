const assert = require("assert");
const request = require("supertest");
const app = require("../../app");
const port = process.env.EXPRESS_PORT || 3000;

describe("/messages", () => {
  let server;

  beforeEach(() => {
    server = app.listen(port);
  });

  afterEach((done) => {
    server.close(done);
  });

  describe("POST", () => {
    it("creates a new message", (done) => {
      request(server).post("/messages").
        send({
          author: "Inquisitive User",
          message: "Why Test?",
        }).
        then(({ text }) => {
          assert.ok(text.match(/Inquisitive User/));
          assert.ok(text.match(/Why Test\?/));
          done();
        });
    });
  });
});
