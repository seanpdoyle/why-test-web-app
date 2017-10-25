const mongoose = require('mongoose');

module.exports = mongoose.model('Message', mongoose.Schema({
  author: {
    type: String,
  },

  message: {
    type: String,
  },
}));
