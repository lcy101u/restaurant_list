const Restaurant = require('../restaurant')
const restaurantList = require('./restaurant.json').results
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('Restaurant seeder running ...')
  Restaurant.create(restaurantList)
    .then(() => {
      console.log('Seeder created successfully!')
      db.close()
    })
    .catch(err => console.error(err))
})