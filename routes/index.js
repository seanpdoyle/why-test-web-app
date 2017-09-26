var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  const messages = req.cookies.messages || [];

  res.render("index", { messages });
});

module.exports = router;
