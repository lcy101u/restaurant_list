const mongoose = require('mongoose')
const mongoDB = 'mongodb://localhost/restaurant'
const Restaurant = require('../restaurant')
const restaurantList = require('./restaurant.json').results
mongoose.connect(mongoDB)

const db = mongoose.connection
db.on('error', () => {
  console.log('MongoDB error!')
})
db.once('open', () => {
  console.log('Restaurant seeder running ...')
  Restaurant.create(restaurantList)
    .then(() => {
      console.log('Seeder created successfully!')
      db.close()
    })
    .catch(err => console.error(err))
})