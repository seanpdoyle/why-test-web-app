const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const cookieValue = req.cookies['order'] || '{}';
  const order = JSON.parse(cookieValue);
  
  res.render('index', { order });
});

module.exports = router;
