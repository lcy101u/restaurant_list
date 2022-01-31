const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .then(restaurants => res.render('index', {restaurants}))
    .catch(error => console.error(error))
})
router.get('/search', (req, res) => {
  const sortBy = req.query.sort
  const keyword = req.query.keyword.toLowerCase().trim()
  var sortMethod = {}
  switch(sortBy) {
    case 'a_to_z': 
      sortMethod.name_en = 'asc'
      break
    case 'z_to_a': 
      sortMethod.name_en = 'desc'
      break
    case 'category': 
      sortMethod.category = 'asc'
      break
    case 'location': 
      sortMethod.location = 'asc'
      break
    default: 
      break
  }
  Restaurant.find({})
    .lean()
    .sort(sortMethod)
    .then(restaurants => {
      const filteredRestaurantsData = restaurants.filter(
        restaurant => restaurant.name.toLowerCase().includes(keyword) || 
                      restaurant.name_en.toLowerCase().includes(keyword) || 
                      restaurant.category.toLowerCase().includes(keyword))
      res.render('index', {restaurants: filteredRestaurantsData, keyword, sortBy})
    })
})
module.exports = router