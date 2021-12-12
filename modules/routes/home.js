const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', {restaurants}))
    .catch(error => console.error(error))
})
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim()
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const filteredRestaurantsData = restaurants.filter(
        restaurant => restaurant.name.toLowerCase().includes(keyword) || 
                      restaurant.name_en.toLowerCase().includes(keyword) || 
                      restaurant.category.toLowerCase().includes(keyword))
      res.render('index', {restaurants: filteredRestaurantsData, keyword})
    })
})
module.exports = router