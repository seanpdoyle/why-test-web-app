const express = require('express');
const router = express.Router();

const Message = require('../models/message');

router.post('/', async (req, res) => {
  const {author, message} = req.body;
  const newMessage = new Message({author, message});

  newMessage.validateSync();

  if (newMessage.errors) {
    res.status(400);

    res.render('index', {
      newMessage: newMessage,
      messages: await Message.find({}),
    });
  } else {
    await newMessage.save();
    res.redirect('/');
  }
});

module.exports = router;
