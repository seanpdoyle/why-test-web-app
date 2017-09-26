const assert = require("chai").assert;
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
      const author = "Inquisitive User";
      const message = "Why Test?";

      request(server).
        post("/messages").
        send({ author, message }).
        then(({ text }) => {
          assert.include(text, author);
          assert.include(text, message);
          done();
        });
    });

    describe("when the author is blank", () => {
      it("renders an error message", (done) => {
        const message = "Why Test?";

        request(server).
          post("/messages").
          send({ message }).
          then(({ text }) => {
            assert.include(text, "Invalid value");
            done();
          });
      });
    });

    describe("when the message is blank", () => {
      it("displays an error message", (done) => {
        const author = "A User";

        request(server).
          post("/messages").
          send({ author }).
          then(({ text }) => {
            assert.include(text, "Invalid value");
            done();
          });
      });
    });
  });
});
