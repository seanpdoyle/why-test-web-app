const express = require('express');
const router = express.Router();

const Message = require('../models/message');

router.get('/', (req, res) => {
  res.sendFile('../public/index.html');
});

module.exports = router;
