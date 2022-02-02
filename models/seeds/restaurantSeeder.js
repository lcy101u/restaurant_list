if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require('../restaurant')
const restaurantList = require('./restaurant.json').results
const User = require('../user')
const db = require('../../config/mongoose')

db.once('open', async () => {
  const seed = []
  console.log('Restaurant seeder running ...')
  await User.find()
    .then(users => {
      for(let i=0; i<6; i++) {
        if(i > 2) {
          restaurantList[i].userId = users[1]._id
        } else {
          restaurantList[i].userId = users[0]._id
        }
        seed.push(restaurantList[i])
      }
      return seed
    })
    .then(async (seed) => {
      await Restaurant.create(seed)
        .then(() => {
          console.log('Restaurant seeder created successfully.')
        })
        .catch(err => console.log(err))
      db.close()
      process.exit()
    })
    .catch(err => console.log(err))
})