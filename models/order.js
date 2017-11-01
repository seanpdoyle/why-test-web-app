const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({
  name: { type: String }
});

orderSchema.statics.updateOrCreate = function() {
  return this.create(...arguments);
};

module.exports = mongoose.model('Order', orderSchema); 
