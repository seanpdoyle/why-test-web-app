const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  //const cookieValue = req.cookies['order'] || '{}';
  //const order = JSON.parse(cookieValue);
  
  const order = {
    name: 'Hungry Person', cake: 'Whole wheat',
  };
  
  res.render('index', { order });
});

module.exports = router;
