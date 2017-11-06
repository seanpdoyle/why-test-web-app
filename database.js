const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const env = process.env.NODE_ENV || 'development';
const host = process.env.DATABASE_HOST || 'localhost';
const databaseUrl = process.env.DATABASE_URL || `mongodb://${host}/why-test_${env}`;
const options= {
  useMongoClient: true,
};

module.exports = {
  mongoose,
  databaseUrl,
  options,
};
