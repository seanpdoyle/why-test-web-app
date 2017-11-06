const express = require('express');
const bodyParser = require('body-parser'); 
const router = express.Router();
const Order = require('../models/order');

router.get('/', async (req, res) => {
  const order = await Order.findOne({});

  res.render('index', { order });
});

router.post('/', async (req, res) => {
  const { name } = req.body;

  if (name) {
    const order = await Order.updateOrCreate({ name: name })

    res.status(200);
    res.render('index', { order });
  } else {
    const errors = { name: 'name is required' };
    res.status(400);
    res.render('index', { errors });
  }
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
