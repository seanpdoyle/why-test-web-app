const express = require('express');
const bodyParser = require('body-parser'); 
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('index');
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
