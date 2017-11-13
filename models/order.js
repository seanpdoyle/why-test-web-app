const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  cakeType: { type: String },
  name: { type: String },
  fillings: { type: [] },
  size: { type: String },
});

orderSchema.statics.updateOrCreate = async function(attributes, callback) {
  const firstOrder = await this.findOne({});

  if (firstOrder) {
    firstOrder.name = attributes.name;
    firstOrder.cakeType = attributes.cakeType;
    firstOrder.fillings = attributes.fillings;
    firstOrder.size = attributes.size;
    return firstOrder.save(callback);
  } else {
    return this.create(attributes, callback);
  }
};

module.exports = mongoose.model('Order', orderSchema);
