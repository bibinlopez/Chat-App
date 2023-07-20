

const mongoose = require('mongoose');

const connectDB = (url) => {
   mongoose.connect(url)
   return 'hello'
}


module.exports = connectDB