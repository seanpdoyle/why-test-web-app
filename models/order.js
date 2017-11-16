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
    firstOrder.cakeType = attributes.cakeType || firstOrder.cakeType;
    if (attributes.fillings && (typeof attributes.fillings === 'string')) {
      attributes.fillings = [attributes.fillings];
    };
    firstOrder.fillings = 
      (attributes.fillings && attributes.fillings.slice(0,1)) || firstOrder.fillings.slice(0,1);
    firstOrder.size = attributes.size || firstOrder.size;
    return firstOrder.save(callback);
  } else {
    return this.create(attributes, callback);
  }
};

module.exports = mongoose.model('Order', orderSchema);
