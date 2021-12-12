const mongoose = require('mongoose')
const mongoDB = 'mongodb://localhost/restaurant'
mongoose.connect(mongoDB)

const db = mongoose.connection
// 連線異常 on => event listener
db.on('error', () => {
  console.log('MongoDB error!')
})
db.once('open', () => {
  console.log('MongoDB connected!')
})
db.once('disconnected', () => {
  console.log('MongoDB disconnected!')
})
module.exports = db