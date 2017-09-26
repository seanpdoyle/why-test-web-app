const express = require("express");
const router = express.Router();

router.post("/", (req, res, next) => {
  const { author, message } = req.body;
  const messages = req.cookies.messages || [];

  messages.push({ author, message });

  res.
    cookie("messages", messages).
    render("index", { messages });
});

module.exports = router;
