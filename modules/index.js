const express = require('express')
const router = express.Router()
const home = require('./routes/home')
const restaurants = require('./routes/restaurants')
router.use('/', home)
router.use('/restaurants', restaurants)
module.exports = router