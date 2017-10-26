const {body, validationResult} = require('express-validator/check');
const express = require('express');
const router = express.Router();

const Message = require('../models/message');

router.get('/', async (req, res) => {
  const messages = await Message.find({});
  res.send(messages);
});

router.post('/', async (req, res) => {
    const {author, message} = req.body;
    if (!author || !message) {
      return res.sendStatus(400);
    }

    const created = await Message.create({author, message});

    const messages = await Message.find({});

    res.status(201).send(created);
  }
);

module.exports = router;
