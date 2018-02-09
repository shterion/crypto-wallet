const mongoose = require('mongoose');

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// Connect to mongoose

const db = mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected ...');
  }).catch((e) => {
    console.log(e);
  });

module.exports = {db};
