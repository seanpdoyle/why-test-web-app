const mongoose = require('mongoose');

module.exports = mongoose.model('Order', mongoose.Schema({
  name: { type: String }
}));
