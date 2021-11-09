const mongoose = require('mongoose');
const config = require('@root/config.json');

let mongoURL = null;
if (config.enableLocalTesting) {
   mongoURL = config.mongoURL;
} else {
   mongoURL = process.env.mongoURL;
}

module.exports = async () => {
   await mongoose.connect(encodeURI(mongoURL), {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
   });
   return mongoose;
};
