const {body, validationResult} = require('express-validator/check');
const express = require('express');
const router = express.Router();

const Message = require('../models/message');

router.post(
  '/',
  [
    body('author').not().isEmpty(),
    body('message').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const {author, message} = req.body;

    if (errors.isEmpty()) {
      await Message.create({author, message});
      res.redirect('/');
    } else {
      res.status(400);

      res.render('index', {
        errors: errors.mapped(),
        messages: await Message.find({}),
      });
    }
  }
);

module.exports = router;
