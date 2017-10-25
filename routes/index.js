const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const order = {
    cake: 'Whole wheat',
    name: 'Hungry Person',
  };
  res.render('index', { order });
});

module.exports = router;
