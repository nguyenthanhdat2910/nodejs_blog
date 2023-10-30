const mongoose = require('mongoose')
async function connect() {
  mongoose
    .connect('mongodb://127.0.0.1:27017/Devin_education_dev')
    .then(() => console.log('Connected! '))
}
module.exports = { connect }
