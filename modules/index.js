const express = require('express')
const router = express.Router()
const home = require('./routes/home')
const users = require('./routes/users')
const restaurants = require('./routes/restaurants')
const auth = require('./routes/auth')
const { authenticator } = require('../middleware/auth')

router.use('/auth', auth)
router.use('/restaurants',authenticator, restaurants)
router.use('/users', users)
router.use('/', authenticator, home)

module.exports = router