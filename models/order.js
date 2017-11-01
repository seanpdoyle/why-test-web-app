const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({
  name: { type: String }
});

orderSchema.statics.updateOrCreate = async function(attributes, callback) {
  const firstOrder = await this.findOne({});
  
  if (firstOrder) {
    firstOrder.name = attributes.name;
    return firstOrder.save(callback);
  } else {
    return this.create(attributes, callback);
  }
};

module.exports = mongoose.model('Order', orderSchema); 
