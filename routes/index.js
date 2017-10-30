const express = require('express');
const bodyParser = require('body-parser'); 
const router = express.Router();
const Order = require('../models/order');

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/', (req, res) => {
  const { name } = req.body;
  const order = Order.findOne() || Order.create()
  order.update({ name: name });

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
