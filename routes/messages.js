const { body, validationResult } = require("express-validator/check");
const express = require("express");
const router = express.Router();

router.post(
  "/",
  [
    body("author").not().isEmpty(),
    body("message").not().isEmpty(),
  ],
  (req, res) => {
    const messages = req.cookies.messages || [];
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const { author, message } = req.body;

      messages.push({ author, message });
      res.cookie("messages", messages);
    }

    res.render("index", {
      errors: errors.mapped(),
      messages: messages,
    });
  }
);

module.exports = router;
