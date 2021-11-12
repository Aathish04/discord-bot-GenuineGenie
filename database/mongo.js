const mongoose = require('mongoose');
const config = require('@root/appConfig.js');

const mongoURL = config.mongoURL;

module.exports = async () => {
   await mongoose.connect(encodeURI(mongoURL), {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
   });
   return mongoose;
};
