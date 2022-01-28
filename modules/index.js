const express = require('express')
const router = express.Router()
const home = require('./routes/home')
const users = require('./routes/users')
const restaurants = require('./routes/restaurants')
router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/users', users)
module.exports = router