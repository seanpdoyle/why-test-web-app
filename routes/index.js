const express = require('express');
const bodyParser = require('body-parser'); 
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/', (req, res) => {
  const order = req.body;

  res.status(200);
  res.render('index', { order });
});
/*
router.use('/', async (req, res) => {
  
  const { name, cake } = req.body;

  const order = {
    name: name, cake: cake,
  };
  
  res.render('index', { order });
});
*/
module.exports = router;
