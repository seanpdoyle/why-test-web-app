const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const env = process.env.NODE_ENV || 'development';
const databaseUrl = process.env.DATABASE_URL || `mongodb://localhost/why-test_${env}`;

mongoose.connect(databaseUrl, {
  useMongoClient: true,
});

module.exports = mongoose;
