const mongoose = require('mongoose');

module.exports = mongoose.model('Message', mongoose.Schema({
  author: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },
}));
